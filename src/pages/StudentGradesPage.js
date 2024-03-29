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
import errorsModule from "../errors";

function init(papers) {
  return {
    errors: [],
    students: Array.from({ length: papers.length }).fill({ loading: true }),
    activeStudentIndex: null
  };
}

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "ADD_STUDENT":
      const students = state.students.slice(0);
      const index = students.findIndex(student => student.loading);
      students[index] = action.student;
      return { ...state, students: students };
    case "ADD_ERROR":
      const studentsC = state.students.slice(0);
      studentsC.pop();
      return {
        ...state,
        errors: [...state.errors, action.error],
        students: studentsC
      };
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

export default function StudentGradesPage({
  modelAnswer,
  papers,
  grades,
  subjectId,
  end
}) {
  const [{ errors, students, activeStudentIndex }, dispatch] = React.useReducer(
    reducer,
    papers,
    init
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
        .then(({ mcq, true_false, id, error }) => {
          if (error) throw errorsModule.ERR_FAIL_PARSE(error, paper.name);
          const parsedId = parseIdArray(id, paper);

          return studentModel.findById(parsedId).then(student => {
            if (!student) {
              throw new GradingError({
                type: "ERROR",
                message: `Unknown student id: ${parsedId}`
              });
            }
            if (!student.subjects.find(subj => subj.id === subjectId)) {
              throw new GradingError({
                type: "ERROR",
                message: `Student with id ${parsedId} doesn't have subject ${subjectId} registered`
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
            .reduce(parseConfidenceArray("true_false", false), resulti([]))
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
          student.midterm = student.subjects.find(
            subj => subj.id === subjectId
          ).midterm;

          dispatch({ type: "ADD_STUDENT", student });
        })
        .catch(error => dispatch({ type: "ADD_ERROR", error }));
    });
  }, [grades, modelAnswer, papers, subjectId]);

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
      end={end}
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
