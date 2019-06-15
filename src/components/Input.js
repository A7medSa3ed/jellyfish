import React from "react";

import TextField from "@material-ui/core/TextField";

export default function Input({ label, value, onChange, defaultValue }) {
  return (
    <TextField
      id="standard-name"
      label={label}
      // className={classes.textField}
      styles={{
        marginLeft: 20,
        marginRight: 20,
        width: 200
      }}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      margin="normal"
    />
  );
}
