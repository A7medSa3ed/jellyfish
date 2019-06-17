import numpy as np
import cv2

# This thing crops:
def detect_circles(img):
  # cv2.imwrite("./exampappers/image.jpeg",thresh)
  # Apply Hough transform on the image
  minRad = round(img.shape[1] * 0.015)
  maxRad = round(img.shape[1] * 0.017)
  print("minRadius is: {}, maxRaduis is: {}".format(minRad, maxRad))
  circles = cv2.HoughCircles(img,
                              cv2.HOUGH_GRADIENT,
                              1,
                              img.shape[0]/45,
                              param1=15,
                              param2=9,
                              minRadius=minRad,
                              maxRadius=maxRad)

  # print("Circles no is: {}".format(len(circles[0])))
  # print("File path is: {}".format(filename))

  # color = cv2.imread("New.jpg")
  # color = color[round(color.shape[0]/8):color.shape[0], 0:color.shape[1]]

  # for i in circles[0]:
  #   # Draw outer circle
  #   cv2.circle(color, (i[0], i[1]), i[2], (0, 255, 0), 5)
  #   # Draw inner circle
  #   cv2.circle(color, (i[0], i[1]), 2, (0, 0, 255), 6)

  # cv2.imwrite("test.jpeg", color)
  # print(len(circles[0]))
  return circles[0]

if __name__ == '__main__':
  detect_circles("./exampapper.jpeg")
