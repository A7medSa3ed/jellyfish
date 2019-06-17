import cv2

from .detecting_circles import detect_circles
from .sorting_answers import sort_answers
from .scanner import scanner

def detect_answers(buffer):
  # Read image as gray-scale
  # image_grayscale = cv2.imread(buffer, cv2.IMREAD_GRAYSCALE)
  image_grayscale = cv2.imdecode(buffer, cv2.IMREAD_GRAYSCALE)

  # Cropping:
  # image_cropped = image_grayscale[round(image_grayscale.shape[0]/9):image_grayscale.shape[0], 0:image_grayscale.shape[1]]
  image_cropped = image_grayscale[round(image_grayscale.shape[0]/8):image_grayscale.shape[0], 0:image_grayscale.shape[1]]

  # Binarization
  ret, thresh = cv2.threshold(image_cropped, 220, 255, cv2.THRESH_BINARY)

  circles_data = detect_circles(thresh)
  answers_dictionary = sort_answers(circles_data)

  return scanner(answers_dictionary, thresh)
