import cv2


def calculate_area_percentage(leaf_mask, disease_mask):
    """
    Calculate the percentage of leaf area affected
    by potential disease regions.

    Returns:
        leaf_pixels: Total leaf pixels
        disease_pixels: Potential disease pixels
        affected_percentage: Percentage of affected area
    """

    # Count leaf pixels
    leaf_pixels = cv2.countNonZero(leaf_mask)

    # Count potential disease pixels
    disease_pixels = cv2.countNonZero(disease_mask)

    # Avoid division by zero
    if leaf_pixels == 0:
        affected_percentage = 0.0
    else:
        affected_percentage = (
            disease_pixels / leaf_pixels
        ) * 100

    return (
        leaf_pixels,
        disease_pixels,
        affected_percentage
    )
    