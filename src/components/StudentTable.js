import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export default function({ answers }) {
  return (
    <Paper style={{ width: "50%" }}>
      <Table style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ color: "#3f51b5", fontWeight: "700", fontSize: "18px" }}
            >
              Number
            </TableCell>
            <TableCell
              style={{ color: "#3f51b5", fontWeight: "700", fontSize: "18px" }}
            >
              Student ID
            </TableCell>
            <TableCell
              style={{ color: "#3f51b5", fontWeight: "700", fontSize: "18px" }}
            >
              Student Name
            </TableCell>
            <TableCell
              style={{ color: "#3f51b5", fontWeight: "700", fontSize: "18px" }}
            >
              Grade
            </TableCell>
            <TableCell
              style={{ color: "#3f51b5", fontWeight: "700", fontSize: "18px" }}
            >
              Check
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answers.map((row, i) => (
            <TableRow key={row.stdId}>
              <TableCell
                style={{
                  width: "100px",
                  textAlign: "40%",
                  fontSize: "16px",
                  fontWeight: "700"
                }}
                component="th"
                scope="row"
              >
                {i + 1}
              </TableCell>
              <TableCell
                style={{ width: "100px", fontSize: "15px", fontWeight: "700" }}
                component="th"
                scope="row"
              >
                {row.stdId}
              </TableCell>
              <TableCell
                style={{ width: "100px", fontSize: "15px", fontWeight: "700" }}
                component="th"
                scope="row"
              >
                {row.stdName}
              </TableCell>
              <TableCell
                style={{ width: "100px", fontSize: "15px", fontWeight: "700" }}
                component="th"
                scope="row"
              >
                {row.Grade}
              </TableCell>
              <TableCell
                style={{ width: "100px", fontSize: "15px", fontWeight: "700" }}
                component="th"
                scope="row"
              >
                <Button variant="contained" color="primary">
                  Check
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
