/** @jsx jsx */
import React from "react";
// import Button from "@material-ui/core/Button";
import { css, jsx } from "@emotion/core";
import Table from "../components/Table";
import { getBase64 } from "../core";
import TextField from "@material-ui/core/TextField";

export default function StudentPage({ close, student }) {
  const [renderedModel, setRenderedModel] = React.useState(null);
  const [grade, setGrade] = React.useState(student.grade);

  React.useEffect(() => {
    getBase64(student.paper)
      .then(setRenderedModel)
      .catch(console.error);
  }, [student.paper]);

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
          border: solid #8369c4 2px;
          border-radius: 0 10px 0 10px;
        `}
      >
        Student Page
      </h2>
      <div
        css={css`
          display: flex;
          .MuiOutlinedInput-notchedOutline {
            border-color: #8369c4 !important;
          }
        `}
      >
        <TextField
          disabled={true}
          id="outlined-name"
          label="Student Name"
          value={student.name}
          variant="outlined"
          style={{
            marginLeft: "18.5%",
            marginTop: " 2%",
            marginBottom: "0px",
            width: " 16.5%"
          }}
          inputProps={{
            style: {
              color: "#fff",
              border: "none",
              paddingLeft: "20px",
              paddingTop: "11px"
            }
          }}
          InputLabelProps={{
            style: { color: "#8369c4", fontWeight: "700", fontSize: "20px" }
          }}
        />
        <TextField
          disabled={true}
          id="outlined-name"
          label="Student ID"
          value={student._id}
          variant="outlined"
          style={{
            marginLeft: "2%",
            marginTop: "2%",
            marginBottom: "0px"
          }}
          inputProps={{
            style: {
              color: "#fff",
              border: "none",
              paddingLeft: "20px",
              paddingTop: "11px"
            }
          }}
          InputLabelProps={{
            style: { color: "#8369c4", fontWeight: "700", fontSize: "20px" }
          }}
        />
        <TextField
          disabled={false}
          id="outlined-name"
          label="Grade"
          value={grade}
          variant="outlined"
          onChange={e => setGrade(+e.target.value)}
          style={{
            marginLeft: "1.5%",
            marginTop: " 2%",
            marginBottom: "0px",
            width: " 9.25%"
          }}
          inputProps={{
            style: {
              color: "#fff",
              border: "none",
              paddingLeft: "20px",
              paddingTop: "11px"
            }
          }}
          InputLabelProps={{
            style: { color: "#8369c4", fontWeight: "700", fontSize: "20px" }
          }}
        />
        <TextField
          disabled={true}
          id="outlined-name"
          label="Mid-Term"
          value={student.midterm}
          variant="outlined"
          style={{
            marginLeft: "2%",
            marginTop: "2%",
            marginBottom: "0px",
            width: " 9.25%"
          }}
          inputProps={{
            style: {
              color: "#fff",
              border: "none",
              paddingLeft: "20px",
              paddingTop: "11px"
            }
          }}
          InputLabelProps={{
            style: { color: "#8369c4", fontWeight: "700", fontSize: "20px" }
          }}
        />
        <TextField
          disabled={true}
          id="outlined-name"
          label="Total Grade"
          value={grade + student.midterm}
          variant="outlined"
          style={{
            marginLeft: "2%",
            marginTop: "2%",
            marginBottom: "0px",
            width: " 9.25%"
          }}
          inputProps={{
            style: {
              color: "#fff",
              border: "none",
              paddingLeft: "20px",
              paddingTop: "11px"
            }
          }}
          InputLabelProps={{
            style: { color: "#8369c4", fontWeight: "700", fontSize: "20px" }
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
              style={{ height: "120%" }}
              gradesVisible={false}
              answers={student.answers}
            />
          </div>
          <button
            // variant="contained"
            // color="primary"
            css={css`
              display: block;
              width: 196%;
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
            onClick={() => close(grade)}
          >
            Save
          </button>
        </div>
        {/* {renderedModel && ( */}
        <img
          src={renderedModel}
          alt="Model Answers"
          css={css`
            min-width: 28%;
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
