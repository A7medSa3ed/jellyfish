/** @jsx jsx */
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

import { css, jsx } from "@emotion/core";
import React from "react";
import List from "@material-ui/core/List";
import StudentTable from "../components/StudentTable";
import ListItemText from "@material-ui/core/ListItemText";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function StudentAnswersPage({ students, errors, check }) {
  const classes = useStyles();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        // width: 100%;
      `}
    >
      <div
        css={css`
          width: 100%;
        `}
      >
        <h2
          css={css`
            display: block;
            width: 64%;
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
          Student Grades Page
        </h2>
        <StudentTable
          css={css`
            width: 100%;
          `}
          students={students}
          check={check}
        />
        <button
          // variant="contained"
          // color="primary"
          css={css`
            width: 40%;
            margin: 35px 30%;
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
          `}
        >
          Submit
        </button>
      </div>
      <Grid
        container
        spacing={2}
        style={{
          color: "red",
          marginTop: "8.25%",
          marginLeft: "-9%",
          border: "2px solid red",
          width: "35%",
          height: " 0%",
          marginRight: "171px"
        }}
      >
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ marginTop: "10px", marginBottom: "0px" }}
          >
            Errors
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {errors.map(error => (
                <ListItem style={{ backgroundColor: "#36393f" }}>
                  <ListItemText css primary={error.message} />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));
