import tensorflow as tf
import numpy as np
import cv2
import os

# Path of current script + MarkingModel.h5
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "MarkingModel.h5")
model = tf.keras.models.load_model(model_path)
model.compile(loss="sparse_categorical_crossentropy", optimizer='adam', metrics=['accuracy'])

# This thing crops:
def scanner(data, img):
    def mark_type(kind, size):
        confidences = [[] for x in range(size)]

        index = 0
        for question_no, mcq in data[kind].items():
            # print(question_no)
            for circle in mcq:

                x1 = int(circle[0] - circle[2] - 5)
                y1 = int(circle[1] - circle[2] - 5)
                x2 = int(circle[0] + circle[2] + 5)
                y2 = int(circle[1] + circle[2] + 5)

                # print(x1, y1, x2, y2)

                circle = img[y1:y2, x1:x2]
                cv2.imwrite("./train/{}{}_2.jpeg".format(kind, index), circle)
                # print(img.shape)
                index += 1
                circle = cv2.resize(circle, (75, 75))
                circle = np.array([circle[..., np.newaxis]])/255.0

                confidence_in_marked = model.predict(circle)[0][1]
                confidences[question_no-1].append(int(confidence_in_marked * 100))

        return confidences

    return {"mcq": mark_type("mcq", 50), "true_false": mark_type("true_false", 25)}
