import cv2


def resize_image(image, width=512):
    """
    Resize image while maintaining its aspect ratio.
    """
    height, original_width = image.shape[:2]

    scale = width / original_width
    new_height = int(height * scale)

    resized = cv2.resize(
        image,
        (width, new_height),
        interpolation=cv2.INTER_AREA
    )

    return resized


def reduce_noise(image):
    """
    Reduce small image noise using Gaussian Blur.
    """
    blurred = cv2.GaussianBlur(
        image,
        (5, 5),
        0
    )

    return blurred


def preprocess_image(image):
    """
    Apply basic preprocessing operations.
    """
    resized = resize_image(image)
    denoised = reduce_noise(resized)

    return denoised