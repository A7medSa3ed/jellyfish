import { resulti } from "resulti";
import equals from "array-equal";
import errors from "./errors";

const maps = {
  mcq: ["A", "B", "C", "D", "E", "F"],
  true_false: ["T", "F"]
};

export function parseConfidenceArray(type) {
  if (!maps[type]) {
    throw Error(`Unknown answer array type ${type}`);
  }

  return (allAnswers, singleAnswers, questionNumber) => {
    if (allAnswers.isErr()) {
      return allAnswers;
    }

    const parsed = singleAnswers.map(confidence => confidence > 60);

    // TODO: TEMP TURN OFF FOR TESTING
    // if (type === "true_false" && parsed.every(v => v === parsed[0])) {
    //   return resulti(undefined, errors["ERR_TF_DUP"](questionNumber))
    // }

    return resulti([
      ...allAnswers.unwrap(),
      { answers: parsed, questionNumber: questionNumber + 1 }
    ]);
  };
}

export function parseIdArray(array) {
  return array.map(innerArray => indexOfMax(innerArray));
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export function answersArrayToString(type) {
  return ({ answers, questionNumber }) => {
    return {
      answers: answers
        .map((ans, index) => ans && maps[type][index])
        .filter(ans => ans)
        .join(", "),
      questionNumber
    };
  };
}

export function calculateStudentGrade(modelAnswers, grades, answers) {
  return (
    calculateTypesGrades("mcq", modelAnswers, grades, answers) +
    calculateTypesGrades("true_false", modelAnswers, grades, answers)
  );
}

function calculateTypesGrades(type, modelAnswers, grades, answers) {
  return modelAnswers[type].map(({ answers: modelAnswer, questionNumber }) =>
    equals(modelAnswer, answers)
      ? grades[type].find(grade => grade.questionNumber === questionNumber)
      : 0
  );
}

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}
