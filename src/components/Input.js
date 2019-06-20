/** @jsx jsx */
// import React from "react";

import { css, jsx } from "@emotion/core";

export default function Input({ value, onChange, defaultValue }) {
  return (
    <div
      className="row"
      css={css`
        margin: 0 25%;
        .input-field .prefix.active,
        .input-field .prefix2.active,
        .input-field .materialize-textarea:focus {
          color: #8369c4;
          border-color: #8369c4;
        }
      `}
    >
      <div className="input-field col s6">
        <i className="material-icons prefix">book</i>
        <textarea
          id="icon_prefix2"
          className="materialize-textarea"
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        ></textarea>
        <label htmlFor="icon_prefix2" className="prefix2">
          Subject ID
        </label>
      </div>
    </div>
  );
}
