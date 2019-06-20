import React from "react";
import { resulti } from "resulti";
import Button from "@material-ui/core/Button";

import StudentTable from "../components/StudentTable";
import studentModel from "../models/student";
import {
  parseConfidenceArray,
  parseIdArray,
  calculateStudentGrade
} from "../core";

export default function StudentGradesPage({ modelAnswer, papers, grades }) {
  const [errors, setErrors] = React.useState([]);
  const [students, setStudents] = React.useState([]);

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
          return studentModel.findById(parseIdArray(id)).then(student => {
            if (!student) {
              throw GradingError({
                type: "ERROR",
                message: `Unknown student id: ${id}`
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

          setStudents(stds => [...stds, student]);
        })
        .catch(error => setErrors(errs => [...errs, error]));
    });
  });

  return (
    <>
      <StudentTable students={students} />
      {errors.join(" ")}
      <Button variant="contained" color="primary" style={{ margin: 20 }}>
        Submit
      </Button>
    </>
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
