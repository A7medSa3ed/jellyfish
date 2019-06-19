import math
import cv2

from .detecting_circles import detect_circles
from .sorting_answers import sort_answers, sort_identity
from .scanner import scanner, id_scanner


def image_from_butter(buffer):
    # Read image as gray-scale
    # image_grayscale = cv2.imread(buffer, cv2.IMREAD_GRAYSCALE)
    image_grayscale = cv2.imdecode(
        buffer, cv2.IMREAD_GRAYSCALE
    )

    return image_grayscale


def detect_answers(image):
    # Cropping (the lower part):
    # image_cropped = image[round(image.shape[0]/9):image.shape[0], 0:image.shape[1]]
    image_cropped = image[
        round(image.shape[0] / 8) : image.shape[0],
        0 : image.shape[1],
    ]

    # Binarization
    ret, thresh = cv2.threshold(
        image_cropped, 220, 255, cv2.THRESH_BINARY
    )

    circles_data = detect_circles(thresh)
    answers_dictionary = sort_answers(circles_data)

    return scanner(answers_dictionary, thresh)


def detect_identity(image):
    # Cropping (the upper part):
    image_cropped = image[
        0 : round(image.shape[0] / 8), 0 : image.shape[1]
    ]

    # Binarization
    ret, thresh = cv2.threshold(
        image_cropped, 220, 255, cv2.THRESH_BINARY
    )

    circles_data = detect_circles(thresh)

    # The following commented code is my attempt
    # to remove "flacky" illogical circles
    # doesn't work due to a flaw in logic

    # print(circles_data)

    # color_img = cv2.cvtColor(image_cropped, cv2.COLOR_GRAY2RGB)

    # for c in circles_data:
    #     cv2.circle(color_img, (c[0], c[1]), c[2], (0, 0, 255), 3)

    # cv2.imshow('image',color_img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    # filtered_circles_data = [circle for circle in circles_data if circle_within_any(circles_data, circle)]

    student_id = sort_identity(circles_data)

    return id_scanner(student_id, thresh)


# def circle_within_any(circles, circle):
#     temp = any(outer_circle[2] > math.sqrt((outer_circle[0]-circle[0])**2 + (outer_circle[1]-circle[1])**2) for outer_circle in circles if not outer_circle is circle)
#     print(temp)
#     return temp
