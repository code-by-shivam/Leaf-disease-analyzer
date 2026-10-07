import cv2
import numpy as np

from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ImageRecord
from .serializers import ImageRecordSerializer

from .image_processing.preprocessing import preprocess_image
from .image_processing.color_processing import process_color_space
from .image_processing.segmentation import segment_leaf
from .image_processing.edge_detection import detect_edges
from .image_processing.disease_detection import detect_disease_regions
from .image_processing.analysis import calculate_area_percentage

from .ai_detection import analyze_leaf_with_ai


class ImageUploadView(APIView):

    def post(self, request):

        # -------------------------------------------------
        # 1. Get uploaded image
        # -------------------------------------------------

        image_file = request.FILES.get("image")

        if not image_file:
            return Response(
                {"error": "No image provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # 2. Validate file extension
        # -------------------------------------------------

        allowed_extensions = [".jpg", ".jpeg", ".png"]
        file_name = image_file.name.lower()

        if not any(
            file_name.endswith(ext)
            for ext in allowed_extensions
        ):
            return Response(
                {
                    "error": (
                        "Only JPG, JPEG and PNG "
                        "images are allowed."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # 3. Read image using OpenCV
        # -------------------------------------------------

        image_bytes = image_file.read()

        image_array = np.frombuffer(
            image_bytes,
            np.uint8
        )

        image = cv2.imdecode(
            image_array,
            cv2.IMREAD_UNCHANGED
        )

        # -------------------------------------------------
        # 4. Validate actual image
        # -------------------------------------------------

        if image is None:
            return Response(
                {"error": "Invalid or corrupted image."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # 5. Module 2 - Image Preprocessing
        # -------------------------------------------------

        processed_image = preprocess_image(image)

        # -------------------------------------------------
        # 6. Module 3 - Color Processing
        # -------------------------------------------------

        hsv_image, enhanced_image = process_color_space(
            processed_image
        )

        # -------------------------------------------------
        # 7. Module 4 - Leaf Segmentation
        # -------------------------------------------------

        polygon = [
            (160, 65),
            (235, 55),
            (315, 65),
            (390, 95),
            (455, 140),
            (505, 190),
            (505, 250),
            (475, 295),
            (405, 315),
            (330, 305),
            (255, 270),
            (195, 225),
            (160, 165)
        ]

        leaf_mask = segment_leaf(
            enhanced_image,
            polygon=polygon
        )

        # -------------------------------------------------
        # 8. Module 5 - Edge Detection
        # -------------------------------------------------

        edge_image = detect_edges(
            enhanced_image
        )

        # -------------------------------------------------
        # 9. Module 6 - Disease Region Detection
        # -------------------------------------------------

        disease_mask = detect_disease_regions(
            enhanced_image,
            leaf_mask
        )

        # -------------------------------------------------
        # 10. Module 7 - Quantitative Analysis
        # -------------------------------------------------

        (
            leaf_pixel_count,
            disease_pixel_count,
            affected_area_percentage
        ) = calculate_area_percentage(
            leaf_mask,
            disease_mask
        )

        # -------------------------------------------------
        # 11. Extract original image metadata
        # -------------------------------------------------

        height, width = image.shape[:2]

        if len(image.shape) == 2:
            channels = 1
        else:
            channels = image.shape[2]

        data_type = str(image.dtype)

        # -------------------------------------------------
        # 12. Reset uploaded file pointer
        # -------------------------------------------------

        image_file.seek(0)

        # -------------------------------------------------
        # 13. Create database record
        # -------------------------------------------------

        record = ImageRecord.objects.create(
            image=image_file,
            width=width,
            height=height,
            channels=channels,
            data_type=data_type,
            leaf_pixel_count=leaf_pixel_count,
            disease_pixel_count=disease_pixel_count,
            affected_area_percentage=affected_area_percentage
        )

        # -------------------------------------------------
        # 14. AI Disease Analysis
        # -------------------------------------------------

        try:

            ai_result = analyze_leaf_with_ai(
                record.image.path
            )

            record.ai_plant = ai_result.get(
                "plant",
                "Unknown"
            )

            record.ai_disease = ai_result.get(
                "disease",
                "Unknown"
            )

            record.ai_confidence = ai_result.get(
                "confidence",
                0
            )

            record.ai_severity = ai_result.get(
                "severity",
                "Unknown"
            )

            record.ai_symptoms = ai_result.get(
                "symptoms",
                []
            )

            record.ai_possible_causes = ai_result.get(
                "possible_causes",
                []
            )

            record.ai_recommendation = ai_result.get(
                "recommendation",
                ""
            )

            record.save()

        except Exception as error:

            print(
                "AI analysis failed:",
                error
            )

        # -------------------------------------------------
        # 15. Save Module 2 - Processed Image
        # -------------------------------------------------

        success, encoded_image = cv2.imencode(
            ".jpg",
            processed_image
        )

        if not success:
            return Response(
                {
                    "error": (
                        "Could not save "
                        "preprocessed image."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        processed_file = ContentFile(
            encoded_image.tobytes(),
            name=(
                f"processed_"
                f"{image_file.name.rsplit('.', 1)[0]}.jpg"
            )
        )

        record.processed_image.save(
            processed_file.name,
            processed_file,
            save=True
        )

        # -------------------------------------------------
        # 16. Save Module 3 - Enhanced Image
        # -------------------------------------------------

        success, enhanced_encoded = cv2.imencode(
            ".jpg",
            enhanced_image
        )

        if not success:
            return Response(
                {
                    "error": (
                        "Could not save "
                        "enhanced image."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        enhanced_file = ContentFile(
            enhanced_encoded.tobytes(),
            name=(
                f"enhanced_"
                f"{image_file.name.rsplit('.', 1)[0]}.jpg"
            )
        )

        record.enhanced_image.save(
            enhanced_file.name,
            enhanced_file,
            save=True
        )

        # -------------------------------------------------
        # 17. Save Module 4 - Leaf Mask
        # -------------------------------------------------

        success, mask_encoded = cv2.imencode(
            ".jpg",
            leaf_mask
        )

        if not success:
            return Response(
                {
                    "error": (
                        "Could not save "
                        "leaf segmentation mask."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        mask_file = ContentFile(
            mask_encoded.tobytes(),
            name=(
                f"mask_"
                f"{image_file.name.rsplit('.', 1)[0]}.jpg"
            )
        )

        record.leaf_mask.save(
            mask_file.name,
            mask_file,
            save=True
        )

        # -------------------------------------------------
        # 18. Save Module 5 - Edge Image
        # -------------------------------------------------

        success, edge_encoded = cv2.imencode(
            ".jpg",
            edge_image
        )

        if not success:
            return Response(
                {
                    "error": (
                        "Could not save "
                        "edge detection image."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        edge_file = ContentFile(
            edge_encoded.tobytes(),
            name=(
                f"edge_"
                f"{image_file.name.rsplit('.', 1)[0]}.jpg"
            )
        )

        record.edge_image.save(
            edge_file.name,
            edge_file,
            save=True
        )

        # -------------------------------------------------
        # 19. Save Module 6 - Disease Mask
        # -------------------------------------------------

        success, disease_encoded = cv2.imencode(
            ".jpg",
            disease_mask
        )

        if not success:
            return Response(
                {
                    "error": (
                        "Could not save "
                        "disease detection mask."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        disease_file = ContentFile(
            disease_encoded.tobytes(),
            name=(
                f"disease_"
                f"{image_file.name.rsplit('.', 1)[0]}.jpg"
            )
        )

        record.disease_mask.save(
            disease_file.name,
            disease_file,
            save=True
        )

        # -------------------------------------------------
        # 20. Serialize response
        # -------------------------------------------------

        serializer = ImageRecordSerializer(
            record,
            context={"request": request}
        )

        # -------------------------------------------------
        # 21. Return response
        # -------------------------------------------------

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class ImageResultView(APIView):

    def get(self, request, pk):

        record = get_object_or_404(
            ImageRecord,
            pk=pk
        )

        serializer = ImageRecordSerializer(
            record,
            context={"request": request}
        )

        return Response(serializer.data)