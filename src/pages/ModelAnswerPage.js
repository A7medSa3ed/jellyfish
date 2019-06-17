import React from "react";
import Button from "@material-ui/core/Button";

import Table from "../components/Table";

export default function ModelAnswerPage({ answers }) {
  const [grades, setGrades] = React.useState(
    Array.from({ length: answers.length }).fill(1)
  );

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Table answers={answers} grades={grades} setGrades={setGrades} />
        <Button variant="contained" color="primary" style={{ margin: 20 }}>
          Submit
        </Button>
      </div>
      <img src="https://via.placeholder.com/700" style={{}} />
    </div>
  );
}
