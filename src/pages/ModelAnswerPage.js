/** @jsx jsx */
import React from "react";
// import Button from "@material-ui/core/Button";
import { css, jsx } from "@emotion/core";
import Table from "../components/Table";
import { getBase64 } from "../core";

export default function ModelAnswerPage({ success, answers, model }) {
  console.log(answers);
  const [MCQGrades, setMCQGrades] = React.useState(
    answers.mcq.map(({ answers, questionNumber }) => {
      const numberOfAnswers = answers.reduce(
        (acc, ans) => acc + (ans ? 1 : 0),
        0
      );
      return {
        grade: numberOfAnswers > 0 ? 1 : 0,
        questionNumber,
        divideMark: numberOfAnswers > 1 ? false : null
      };
    })
  );

  const [trueOrFalseGrades, setTrueOrFalseGrades] = React.useState(
    answers.true_false.map(({ answers, questionNumber }) => {
      const numberOfAnswers = answers.reduce(
        (acc, ans) => acc + (ans ? 1 : 0),
        0
      );
      return {
        grade: numberOfAnswers > 0 ? 1 : 0,
        questionNumber,
        divideMark: numberOfAnswers > 1 ? false : null
      };
    })
  );

  const [renderedModel, setRenderedModel] = React.useState(null);

  React.useEffect(() => {
    getBase64(model)
      .then(setRenderedModel)
      .catch(console.error);
  }, [model]);

  const grades = { mcq: MCQGrades, true_false: trueOrFalseGrades };

  return (
    <>
      <h2
        css={css`
          display: block;
          width: 58%;
          margin: 2% auto 0;
          text-align: center;
          font-weight: 600;
          font-family: "Titillium Web", sans-serif;
          position: relative;
          font-size: 36px;
          line-height: 40px;

          padding: 15px 50px 15px 15px;
          color: #8369c4;
          // box-shadow: inset 0 0 0 1px #8369c4, inset 0 0 5px #8369c4,
          // inset -285px 0 35px white;
          border: solid #8369c4 2px;
          border-radius: 0 10px 0 10px;
          // background-color: red;
        `}
      >
        Model Answer Page
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          css={css`
            // width: 50%;
          `}
        >
          <div
            css={css`
              border: solid #8369c4 2px;
              border-right: none;
              ::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: #f5f5f5;
                border-radius: 10px;
              }

              ::-webkit-scrollbar {
                width: 10px;
                background-color: #f5f5f5;
              }

              ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background-image: -webkit-gradient(
                  linear,
                  left bottom,
                  left top,
                  color-stop(0.44, #c8aff9),
                  color-stop(0.72, #c4a4f7),
                  color-stop(0.86, #8369c4)
                );
              }

              overflow-y: scroll;
              overflow-x: hidden;

              max-width: 100%;
              max-height: 777px;
              margin: 30px 0% 0 1%;
            `}
          >
            <Table
              gradesVisible={true}
              answers={answers}
              grades={grades}
              setGrades={{
                mcq: setMCQGrades,
                true_false: setTrueOrFalseGrades
              }}
            />
          </div>
          <button
            // variant="contained"
            // color="primary"
            css={css`
              display: block;
              width: 214%;
              margin: 7% auto 0 6px;
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
              max-width: 50%;
              max-height: 777px;
              margin: 30px 0% 0 1%;
              border: solid #8369c4 2px;
            `}
          />
        )}
      </div>
    </>
  );
}
