import { resulti } from "resulti";
import equals from "array-equal";
import errors from "./errors";
import leftPad from "left-pad";

const maps = {
  mcq: ["A", "B", "C", "D", "E", "F"],
  true_false: ["T", "F"]
};

export function parseConfidenceArray(type, careAboutDoubles = true) {
  if (!maps[type]) {
    throw Error(`Unknown answer array type ${type}`);
  }

  return (allAnswers, singleAnswers, questionNumber) => {
    if (allAnswers.isErr()) {
      return allAnswers;
    }

    const parsed = singleAnswers.map(confidence => confidence > 60);

    if (
      careAboutDoubles &&
      type === "true_false" &&
      parsed.every(v => v === true)
    ) {
      return resulti(undefined, errors["ERR_TF_DUP"](questionNumber + 1));
    }

    return resulti([
      ...allAnswers.unwrap(),
      { answers: parsed, questionNumber: questionNumber + 1 }
    ]);
  };
}

export function parseIdArray(array) {
  return array.map(innerArray => indexOfMax(innerArray)).join("");
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
    calculateMCQGrades(modelAnswers, grades, answers) +
    calculateTrueOrFalseGrades(modelAnswers, grades, answers)
  );
}

function calculateMCQGrades(modelAnswers, grades, answers) {
  return modelAnswers.mcq
    .map(({ answers: modelAnswer, questionNumber }) => {
      const grade = grades.mcq.find(
        grade => grade.questionNumber === questionNumber
      );
      const { answers: answer } = answers.mcq.find(
        ans => ans.questionNumber === questionNumber
      );

      if (grade.divideMark) {
        const modelAnswerCount = modelAnswer.reduce(count(true), 0);
        if (modelAnswerCount !== answer.reduce(count(true), 0)) {
          return 0;
        }

        return (
          (fromBinaryToArray(
            fromArrayToBinary(modelAnswer) & fromArrayToBinary(answer)
          ).reduce(count(true), 0) /
            modelAnswerCount) *
          grade.grade
        );
      }

      return equals(modelAnswer, answer) ? grade.grade : 0;
    })
    .reduce((a, b) => a + b);
}

function calculateTrueOrFalseGrades(modelAnswers, grades, answers) {
  return modelAnswers.true_false
    .map(({ answers: modelAnswer, questionNumber }) => {
      const grade = grades.true_false.find(
        grade => grade.questionNumber === questionNumber
      );
      const { answers: answer } = answers.true_false.find(
        ans => ans.questionNumber === questionNumber
      );

      return equals(modelAnswer, answer) ? grade.grade : 0;
    })
    .reduce((a, b) => a + b);
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

function count(element) {
  return (acc, ele) => (element === ele ? acc + 1 : acc);
}

function fromArrayToBinary(arr) {
  return arr.reduce((acc, bool) => (acc << 1) + (bool ? 1 : 0), 0);
}

function fromBinaryToArray(num) {
  return leftPad(num.toString(2), 6, "0")
    .split("")
    .map(x => x === "1");
}

function inspect(thing) {
  console.log(thing);
  return thing;
}
