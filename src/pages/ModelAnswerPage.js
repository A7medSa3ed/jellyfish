import React from "react";
import Button from "@material-ui/core/Button";

import Table from "../components/Table";

export default function ModelAnswerPage({ answers }) {
  const [MCQGrades, setMCQGrades] = React.useState(
    Array.from({ length: answers.mcq.length }).fill(1)
  );

  const [trueOrFalseGrades, setTrueOrFalseGrades] = React.useState(
    Array.from({ length: answers.trueOrFalse.length }).fill(1)
  );

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Table
          answers={answers}
          grades={{ mcq: MCQGrades, trueOrFalse: trueOrFalseGrades }}
          setGrades={{ mcq: setMCQGrades, trueOrFalse: setTrueOrFalseGrades }}
        />
        <Button variant="contained" color="primary" style={{ margin: 20 }}>
          Submit
        </Button>
      </div>
      <img src="https://via.placeholder.com/700" style={{}} />
    </div>
  );
}
