# x y r
import numpy as np


def sort_answers(data):
    sortedXs = sort(data, 25)
    # print(sortedXs)

    dictionary = {"mcq": {}, "true_false": {}}

    for idx, row in enumerate(sortedXs):
        dictionary["mcq"][idx + 1] = row[0:6]
        dictionary["mcq"][idx + 26] = row[6:12]

        dictionary["true_false"][idx + 1] = row[12:14]

    # print(dictionary)
    return dictionary


def sort_identity(data):
    sortedXs = sort(data, 3)

    student_id = [
        sortedXs[0][0:10],
        sortedXs[1][0:10],
        sortedXs[2][0:10],
        sortedXs[0][10:20],
        sortedXs[1][10:20],
        sortedXs[2][10:20],
    ]

    return student_id


def sort(data, row__count):
    sortedYs = np.array(
        sorted(data, key=lambda circle: (circle[1]))
    )
    dividedYs = np.split(sortedYs, row__count)

    sortedXs = []
    for row in dividedYs:
        sortedXs.append(
            np.array(sorted(row, key=lambda row: (row[0])))
        )

    return sortedXs
