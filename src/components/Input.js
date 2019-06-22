/** @jsx jsx */
// import React from "react";
import TextField from "@material-ui/core/TextField";

import { css, jsx } from "@emotion/core";

export default function Input({ value, onChange, defaultValue }) {
  return (
    <div
      css={css`
        .MuiTextField-root {
          width: 55.5%;
          margin: 0px 21.5%;
        }
        .MuiInput-multiline {
          font-size: 25px;
          color: #fff;
          padding: 10px;
        }
        MuiInput-inputMultiline {
          height: 35px;
        }
        .MuiTextField-root label {
          color: #8369c4;
          font-size: 20px;
          margin-top: 0px;
        }
        .MuiInput-underline:after {
          border-bottom-color: #8369c4;
        }
        label + .MuiInput-formControl {
          // margin-top: 15px;
        }
      `}
    >
      <TextField
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        id="standard-dense"
        label="Subject ID"
        // className={clsx(classes.textField, classes.dense)}
        // margin="dense"
        multiline
      />
    </div>
  );
}
