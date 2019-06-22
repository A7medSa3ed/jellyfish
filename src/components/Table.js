/** @jsx jsx */
// import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { answersArrayToString } from "../core";
import Checkbox from "@material-ui/core/Checkbox";

// import React from "react";

import { css, jsx } from "@emotion/core";
function rows(rows, grades, setGrades, type, gradesVisible) {
  const rowStyle =
    type === "true_false" ? { borderTop: "3px #8369C4 dashed" } : {};

  return rows.map(answersArrayToString(type)).map((row, i) => (
    <TableRow
      key={row.questionNumber}
      style={!i ? rowStyle : {}}
      css={css`
        background-color: #36393f;
        .MuiTableCell-body {
          color: #fff;

          .MuiFormLabel-root,
          .MuiInputBase-root {
            color: #fff;
          }
        }
      `}
    >
      <TableCell
        style={{
          width: "150px",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "700"
        }}
        component="th"
        scope="row"
      >
        {row.questionNumber}
      </TableCell>
      <TableCell
        style={{
          width: "100px",
          fontSize: "15px",
          fontWeight: "700",
          textAlign: "center"
        }}
        component="th"
        scope="row"
      >
        {row.answers}
      </TableCell>
      {gradesVisible && (
        <TableCell
          style={{
            width: "100px",
            fontSize: "15px",
            fontWeight: "700",
            textAlign: "center"
          }}
          component="th"
          scope="row"
        >
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange("checkedB")}
            value="checkedB"
            style={{ color: "#fff" }}
            inputProps={{
              "aria-label": "secondary checkbox"
            }}
          />
        </TableCell>
      )}
      {gradesVisible && (
        <TableCell
          style={{
            width: "100px",
            fontSize: "15px",
            fontWeight: "700",
            textAlign: "left"
          }}
          component="th"
          scope="row"
        >
          <TextField
            id="outlined-number"
            label="Grade"
            type="number"
            value={grades[i].grade}
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => {
              const newGrades = grades.slice(0);
              newGrades[i].grade = +e.target.value;
              setGrades(newGrades);
            }}
            margin="normal"
            variant="outlined"
            css={css`
              input[type="number"] {
                padding: 12px;
                text-align: center;
                max-height: 20.5px;
                padding-bottom: 0px;
              }
              input[type="number"]:not(.browser-default):focus:not([readonly]),
              input[type="number"]:not(.browser-default) {
                box-shadow: none;
                border-bottom: none;
              }
              .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
                border-color: #8369c4;
              }
            `}
          />
        </TableCell>
      )}
    </TableRow>
  ));
}

export default function({ answers, grades, setGrades, gradesVisible = true }) {
  return (
    <Paper
      style={
        {
          // width: "125%",
          // minHeight: "10px"
          // marginLeft: "10%",
          // marginTop: "50px"
        }
      }
    >
      <Table
        // style={{ width: "100%" }}
        css={css`
          background-color: #36393f;
        `}
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                color: "#8369C4",
                fontWeight: "700",
                fontSize: "18px",
                textAlign: "center"
              }}
            >
              Question NO#
            </TableCell>
            <TableCell
              style={{
                color: "#8369C4",
                fontWeight: "700",
                fontSize: "18px",
                textAlign: "center"
              }}
            >
              Answer
            </TableCell>
            {gradesVisible && (
              <TableCell
                style={{
                  color: "#8369C4",
                  fontWeight: "700",
                  fontSize: "18px",
                  textAlign: "center"
                }}
              >
                Divide
              </TableCell>
            )}
            {gradesVisible && (
              <TableCell
                style={{
                  color: "#8369C4",
                  fontWeight: "700",
                  fontSize: "18px",
                  textAlign: "center"
                }}
              >
                Grade
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows(answers.mcq, grades.mcq, setGrades.mcq, "mcq", gradesVisible)}
          {rows(
            answers.true_false,
            grades.true_false,
            setGrades.true_false,
            "true_false",
            gradesVisible
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
