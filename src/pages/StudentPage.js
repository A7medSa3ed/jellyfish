/** @jsx jsx */
import React from "react";
// import Button from "@material-ui/core/Button";
import { css, jsx } from "@emotion/core";
import Table from "../components/Table";
import { getBase64 } from "../core";

export default function StudentPage({ success, answers, model }) {
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <Table
          answers={answers}
          grades={grades}
          setGrades={{ mcq: setMCQGrades, true_false: setTrueOrFalseGrades }}
        />
        <button
          // variant="contained"
          // color="primary"
          css={css`
            width: 148%;
            margin: 10% 11%;
            background: #8369c4;
            color: #fff;
            border: none;
            position: relative;
            font-size: 1.6em;
            padding: 8px;
            cursor: pointer;
            transition: 800ms ease all;
            outline: none;
            &:hover {
              background: #fff;
              color: #8369c4;
            }
            &:before,
            &:after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              height: 2px;
              width: 0;
              background: #8369c4;
              transition: 400ms ease all;
            }
            &:after {
              right: inherit;
              top: inherit;
              left: 0;
              bottom: 0;
            }
            &:hover:before,
            &:hover:after {
              width: 100%;
              transition: 800ms ease all;
            }
            &[disabled] {
              background-color: #d7d7d7;
              cursor: not-allowed;
              color: #a5a9ae;
              &:before,
              &:after {
                border: none;
                transition: none;
                content: none;
              }
            }
            &:focus {
              background: #8369c4;
              color: white;
            }
          `}
          onClick={() => success(grades)}
        >
          Submit
        </button>
      </div>
      {renderedModel && (
        <img
          src={renderedModel}
          alt="Model Answers"
          css={css`
            @media (min-width: 1200px) {
              max-width: 50%;
              max-height: 1500px;
              margin: 50px 0% 0 19%;
              border: solid #8369c4 2px;
            }
            @media (max-width: 1200px) {
              max-width: 34%;
              max-height: 800px;
              margin-left: 25%;
              margin-right: 0%;
              margin-top: 50px;
            }
          `}
        />
      )}
    </div>
  );
}
