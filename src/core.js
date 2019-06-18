import { resulti } from "resulti";
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
