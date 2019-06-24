import React from "react";
import { resulti } from "resulti";

import StudentAnswersPage from "./StudentAnswersPage";
import StudentPage from "./StudentPage";
import studentModel from "../models/student";
import {
  parseConfidenceArray,
  parseIdArray,
  calculateStudentGrade
} from "../core";

const initialState = {
  errors: [],
  students: [],
  activeStudentIndex: null
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "ADD_STUDENT":
      return { ...state, students: [...state.students, action.student] };
    case "ADD_ERROR":
      return { ...state, errors: [...state.errors, action.error] };
    case "GOTO_STUDENT":
      return { ...state, activeStudentIndex: action.index };
    case "GOTO_MAIN":
      const studentsNew = state.students.slice(0);
      studentsNew[state.activeStudentIndex] = {
        ...studentsNew[state.activeStudentIndex],
        grade: action.grade
      };

      studentsNew[state.activeStudentIndex]._id =
        state.students[state.activeStudentIndex]._id;
      studentsNew[state.activeStudentIndex].name =
        state.students[state.activeStudentIndex].name;

      return {
        ...state,
        activeStudentIndex: null,
        students: studentsNew
      };
    default:
      throw new Error();
  }
}

export default function StudentGradesPage({ modelAnswer, papers, grades }) {
  const [{ errors, students, activeStudentIndex }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  console.log({ errors, students, activeStudentIndex });
  // const [errors, setErrors] = React.useState([]);
  // const [students, setStudents] = React.useState([]);
  // const [activeStudentIndex, setActiveStudentIndex] = React.useState(null);

  React.useEffect(() => {
    papers.map(paper => {
      const data = new FormData();
      data.append("paper", paper, paper.name);

      return fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: data
      })
        .then(response => response.json())
        .then(({ mcq, true_false, id }) => {
          const parsedId = parseIdArray(id);

          return studentModel.findById(parsedId).then(student => {
            if (!student) {
              throw new GradingError({
                type: "ERROR",
                message: `Unknown student id: ${parsedId}`
              });
            }

            return { student, mcq, true_false };
          });
        })
        .then(({ student, mcq, true_false }) => {
          const resultMCQ = mcq
            .reduce(parseConfidenceArray("mcq"), resulti([]))
            .unwrapOrElse(err => {
              throw err;
            });

          const resultTrueOrFalse = true_false
            .reduce(parseConfidenceArray("true_false"), resulti([]))
            .unwrapOrElse(err => {
              throw err;
            });

          return {
            student,
            mcq: resultMCQ,
            true_false: resultTrueOrFalse
          };
        })
        .then(({ student, mcq, true_false }) => {
          student.grade = calculateStudentGrade(modelAnswer, grades, {
            mcq,
            true_false
          });
          student.answers = { mcq, true_false };
          student.paper = paper;

          dispatch({ type: "ADD_STUDENT", student });
        })
        .catch(error => dispatch({ type: "ADD_ERROR", error }));
    });
  }, [grades, modelAnswer, papers]);

  return activeStudentIndex !== null ? (
    <StudentPage
      student={students[activeStudentIndex]}
      close={grade => dispatch({ type: "GOTO_MAIN", grade })}
    />
  ) : (
    <StudentAnswersPage
      students={students}
      errors={errors}
      check={index => dispatch({ type: "GOTO_STUDENT", index })}
    />
  );
}

class GradingError extends Error {
  constructor({ message, type }) {
    // Specify error text
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GradingError);
    }

    // Custom debugging information
    this.type = type;
  }
}
