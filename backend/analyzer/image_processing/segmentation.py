import cv2
import numpy as np


def segment_leaf(image, polygon=None):
    """
    Segment the target leaf using a polygon ROI.

    Parameters:
        image: BGR image
        polygon: List of (x, y) points defining the
                 target leaf region.

    Returns:
        final_mask: Full-size binary leaf mask
                    Leaf       = 255
                    Background = 0
    """

    height, width = image.shape[:2]

    # -------------------------------------------------
    # 1. Create polygon ROI
    # -------------------------------------------------

    if polygon is None:
        polygon = [
            (270, 170),
            (330, 135),
            (410, 145),
            (500, 190),
            (600, 245),
            (590, 350),
            (500, 370),
            (400, 340),
            (300, 300),
            (270, 240)
        ]

    polygon = np.array(
        polygon,
        dtype=np.int32
    )

    roi_mask = np.zeros(
        (height, width),
        dtype=np.uint8
    )

    cv2.fillPoly(
        roi_mask,
        [polygon],
        255
    )

    # -------------------------------------------------
    # 2. Convert image to HSV
    # -------------------------------------------------

    hsv = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2HSV
    )

    # -------------------------------------------------
    # 3. Leaf color segmentation
    # -------------------------------------------------

    lower_leaf = np.array([
        20,
        25,
        25
    ])

    upper_leaf = np.array([
        100,
        255,
        255
    ])

    color_mask = cv2.inRange(
        hsv,
        lower_leaf,
        upper_leaf
    )

    # -------------------------------------------------
    # 4. Restrict segmentation to polygon ROI
    # -------------------------------------------------

    mask = cv2.bitwise_and(
        color_mask,
        roi_mask
    )

    # -------------------------------------------------
    # 5. Morphological opening
    # -------------------------------------------------

    opening_kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE,
        (5, 5)
    )

    mask = cv2.morphologyEx(
        mask,
        cv2.MORPH_OPEN,
        opening_kernel,
        iterations=1
    )

    # -------------------------------------------------
    # 6. Morphological closing
    # -------------------------------------------------

    closing_kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE,
        (7, 7)
    )

    mask = cv2.morphologyEx(
        mask,
        cv2.MORPH_CLOSE,
        closing_kernel,
        iterations=2
    )

    # -------------------------------------------------
    # 7. Find contours inside polygon
    # -------------------------------------------------

    contours, _ = cv2.findContours(
        mask,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    if not contours:
        return np.zeros(
            (height, width),
            dtype=np.uint8
        )

    # -------------------------------------------------
    # 8. Select largest region inside polygon
    # -------------------------------------------------

    largest_contour = max(
        contours,
        key=cv2.contourArea
    )

    final_mask = np.zeros(
        (height, width),
        dtype=np.uint8
    )

    cv2.drawContours(
        final_mask,
        [largest_contour],
        -1,
        255,
        thickness=cv2.FILLED
    )

    # -------------------------------------------------
    # 9. Keep only polygon area
    # -------------------------------------------------

    final_mask = cv2.bitwise_and(
        final_mask,
        roi_mask
    )

    # -------------------------------------------------
    # 10. Final cleanup
    # -------------------------------------------------

    final_mask = cv2.morphologyEx(
        final_mask,
        cv2.MORPH_CLOSE,
        closing_kernel,
        iterations=1
    )

    return final_mask