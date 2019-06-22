/** @jsx jsx */
import React from "react";
// import Button from "@material-ui/core/Button";
import Image from "../components/ans.jpg";
import { css, jsx } from "@emotion/core";
import Table from "../components/Table";
import { getBase64 } from "../core";
import TextField from "@material-ui/core/TextField";

export default function StudentPage({
  success,
  answers,
  model,
  gradesVisible = false
}) {
  const [values] = React.useState({
    name: "Ahmed Saeed",
    id: 140130
  });

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
    <>
      <h2
        css={css`
          display: block;
          width: 59.5%;
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
        Student Page
      </h2>
      <div
        css={css`
          display: flex;
        `}
      >
        <TextField
          disabled={true}
          id="outlined-name"
          label="Student Name"
          value={values.name}
          variant="outlined"
          style={{
            marginLeft: "18.5%",
            marginTop: " 2%",
            marginBottom: "0px",
            width: " 16.5%"
          }}
        />
        <TextField
          disabled={true}
          id="outlined-name"
          label="Student ID"
          value={values.id}
          variant="outlined"
          style={{ marginLeft: "2%", marginTop: "2%", marginBottom: "0px" }}
        />
        <TextField
          disabled={true}
          id="outlined-name"
          label="Grade"
          value={values.name}
          variant="outlined"
          style={{
            marginLeft: "1.5%",
            marginTop: " 2%",
            marginBottom: "0px",
            width: " 9.25%"
          }}
        />
        <TextField
          disabled={true}
          id="outlined-name"
          label="Mid-Term"
          value={values.id}
          variant="outlined"
          style={{
            marginLeft: "2%",
            marginTop: "2%",
            marginBottom: "0px",
            width: " 9.25%"
          }}
        />
        <TextField
          disabled={true}
          id="outlined-name"
          label="Total Grade"
          value={values.id}
          variant="outlined"
          style={{
            marginLeft: "2%",
            marginTop: "2%",
            marginBottom: "0px",
            width: " 9.25%"
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div style={{ width: "30%" }}>
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
              height: 610px;
              margin: 30px 0% 0 1%;
            `}
          >
            <Table
              style={{ height: "100%" }}
              gradesVisible={gradesVisible}
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
              width: 210%;
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
        {/* {renderedModel && ( */}
        <img
          src={Image}
          alt="Model Answers"
          css={css`
            min-width: 32%;
            max-height: 610px;
            margin: 30px 0% 0 1%;
            border: solid #8369c4 2px;
          `}
        />
        {/* // )} */}
      </div>
    </>
  );
}
