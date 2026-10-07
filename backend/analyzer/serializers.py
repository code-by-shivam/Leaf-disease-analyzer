from rest_framework import serializers
from .models import ImageRecord


class ImageRecordSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    processed_image_url = serializers.SerializerMethodField()
    enhanced_image_url = serializers.SerializerMethodField()
    leaf_mask_url = serializers.SerializerMethodField()
    edge_image_url = serializers.SerializerMethodField()
    disease_mask_url = serializers.SerializerMethodField()
    


    class Meta:
        model = ImageRecord

        fields = [
            "id",
            "image",
            "image_url",
            "processed_image",
            "processed_image_url",
            "enhanced_image",
            "enhanced_image_url",
            "leaf_mask",
            "leaf_mask_url",
            "edge_image",
            "edge_image_url",
            "disease_mask",
            "disease_mask_url",
            "leaf_pixel_count",
            "disease_pixel_count",
            "affected_area_percentage",
            "ai_plant",
            "ai_disease",
            "ai_confidence",
            "ai_severity",
            "ai_symptoms",
            "ai_possible_causes",
            "ai_recommendation",
            "width",
            "height",
            "channels",
            "data_type",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "image_url",
            "processed_image",
            "processed_image_url",
            "enhanced_image",
            "enhanced_image_url",
            "leaf_mask",
            "leaf_mask_url",
            "edge_image",
            "edge_image_url",
            "disease_mask",
            "disease_mask_url",
            "ai_plant",
            "ai_disease",
            "ai_confidence",
            "ai_severity",
            "ai_symptoms",
            "ai_possible_causes",
            "ai_recommendation",
            "width",
            "height",
            "channels",
            "data_type",
            "created_at",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")

        if request and obj.image:
            return request.build_absolute_uri(
                obj.image.url
            )

        return None

    def get_processed_image_url(self, obj):
        request = self.context.get("request")

        if request and obj.processed_image:
            return request.build_absolute_uri(
                obj.processed_image.url
            )

        return None

    def get_enhanced_image_url(self, obj):
        request = self.context.get("request")

        if request and obj.enhanced_image:
            return request.build_absolute_uri(
                obj.enhanced_image.url
            )

        return None

    def get_leaf_mask_url(self, obj):
        request = self.context.get("request")

        if request and obj.leaf_mask:
            return request.build_absolute_uri(
                obj.leaf_mask.url
            )

        return None


    def get_edge_image_url(self, obj):
        request = self.context.get("request")

        if request and obj.edge_image:
            return request.build_absolute_uri(
                obj.edge_image.url
            )

        return None
    
    def get_disease_mask_url(self, obj):
        request = self.context.get("request")

        if request and obj.disease_mask:
            return request.build_absolute_uri(
                obj.disease_mask.url
            )

        return None