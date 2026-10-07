import cv2


def convert_to_hsv(image):
    """
    Convert a BGR image to HSV color space.
    """
    return cv2.cvtColor(image, cv2.COLOR_BGR2HSV)


def convert_to_lab(image):
    """
    Convert a BGR image to LAB color space.
    """
    return cv2.cvtColor(image, cv2.COLOR_BGR2LAB)


def process_color_space(image):
    """
    Apply Module 3 color processing.

    Returns:
        hsv_image: HSV representation
        enhanced_bgr: Contrast-enhanced BGR image
    """

    hsv_image = convert_to_hsv(image)

    enhanced_lab = enhance_contrast_lab(image)

    enhanced_bgr = lab_to_bgr(enhanced_lab)

    return hsv_image, enhanced_bgr

    
def enhance_contrast_lab(image):
    """
    Enhance contrast using CLAHE on the LAB lightness channel.
    """

    lab_image = convert_to_lab(image)

    l_channel, a_channel, b_channel = cv2.split(lab_image)

    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    enhanced_l = clahe.apply(l_channel)

    enhanced_lab = cv2.merge(
        (enhanced_l, a_channel, b_channel)
    )

    return enhanced_lab

def lab_to_bgr(lab_image):
    """
    Convert LAB image back to BGR color space.
    """
    bgr_image = cv2.cvtColor(
        lab_image,
        cv2.COLOR_LAB2BGR
    )

    return bgr_image