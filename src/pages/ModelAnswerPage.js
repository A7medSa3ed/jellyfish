import React from "react";
import Button from "@material-ui/core/Button";

import Table from "../components/Table";
import { getBase64 } from "../core";

export default function ModelAnswerPage({ success, answers, model }) {
  const [MCQGrades, setMCQGrades] = React.useState(
    answers.mcq.map(({ answers }) => (answers.some(ans => ans) ? 1 : 0))
  );

  const [trueOrFalseGrades, setTrueOrFalseGrades] = React.useState(
    answers.true_false.map(({ answers }) => (answers.some(ans => ans) ? 1 : 0))
  );

  const [renderedModel, setRenderedModel] = React.useState(null);

  React.useEffect(() => {
    getBase64(model)
      .then(setRenderedModel)
      .catch(console.error);
  }, [model]);

  const grades = { mcq: MCQGrades, true_false: trueOrFalseGrades };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Table
          answers={answers}
          grades={grades}
          setGrades={{ mcq: setMCQGrades, true_false: setTrueOrFalseGrades }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 20 }}
          onClick={() => success(grades)}
        >
          Submit
        </Button>
      </div>
      {renderedModel && <img src={renderedModel} alt="Model Answers" />}
    </div>
  );
}
