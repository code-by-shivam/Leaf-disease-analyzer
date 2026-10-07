import cv2


def detect_edges(image):
    """
    Detect edges using Canny edge detection.

    Input:
        image: BGR image

    Output:
        edges: Binary edge image
    """

    # Convert image to grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # Detect edges using Canny
    edges = cv2.Canny(
        gray,
        threshold1=50,
        threshold2=150
    )

    return edges