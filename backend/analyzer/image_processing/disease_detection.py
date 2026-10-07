import cv2
import numpy as np


def detect_disease_regions(image, leaf_mask):
    """
    Detect potential brown/yellow abnormal regions
    inside the segmented leaf.

    This is a heuristic indicator based on color.
    It does NOT identify a specific plant disease.
    """

    # -------------------------------------------------
    # 1. Convert BGR image to HSV
    # -------------------------------------------------

    hsv = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2HSV
    )

    # -------------------------------------------------
    # 2. Detect brown regions
    # -------------------------------------------------

    lower_brown = np.array([
        5,
        50,
        30
    ])

    upper_brown = np.array([
        20,
        255,
        200
    ])

    brown_mask = cv2.inRange(
        hsv,
        lower_brown,
        upper_brown
    )

    # -------------------------------------------------
    # 3. Detect yellow regions
    # -------------------------------------------------

    lower_yellow = np.array([
        20,
        70,
        60
    ])

    upper_yellow = np.array([
        35,
        255,
        230
    ])

    yellow_mask = cv2.inRange(
        hsv,
        lower_yellow,
        upper_yellow
    )

    # -------------------------------------------------
    # 4. Combine brown and yellow regions
    # -------------------------------------------------

    disease_mask = cv2.bitwise_or(
        brown_mask,
        yellow_mask
    )

    # -------------------------------------------------
    # 5. Restrict detection to leaf area
    # -------------------------------------------------

    disease_mask = cv2.bitwise_and(
        disease_mask,
        leaf_mask
    )

    # -------------------------------------------------
    # 6. Morphological opening
    # -------------------------------------------------
    # Remove small isolated noise.

    kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE,
        (5, 5)
    )

    disease_mask = cv2.morphologyEx(
        disease_mask,
        cv2.MORPH_OPEN,
        kernel,
        iterations=1
    )

    # -------------------------------------------------
    # 7. Morphological closing
    # -------------------------------------------------
    # Connect nearby abnormal regions.

    disease_mask = cv2.morphologyEx(
        disease_mask,
        cv2.MORPH_CLOSE,
        kernel,
        iterations=1
    )

    # -------------------------------------------------
    # 8. Remove very small connected components
    # -------------------------------------------------

    num_labels, labels, stats, _ = (
        cv2.connectedComponentsWithStats(
            disease_mask,
            connectivity=8
        )
    )

    cleaned_mask = np.zeros_like(
        disease_mask
    )

    minimum_area = 20

    for label in range(1, num_labels):

        area = stats[
            label,
            cv2.CC_STAT_AREA
        ]

        if area >= minimum_area:

            cleaned_mask[
                labels == label
            ] = 255

    # -------------------------------------------------
    # 9. Final leaf restriction
    # -------------------------------------------------

    cleaned_mask = cv2.bitwise_and(
        cleaned_mask,
        leaf_mask
    )

    return cleaned_mask