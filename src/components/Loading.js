/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function Loading() {
  return (
    <div
      css={css`
        display: block;
        position: fixed;
        top: 40%;
        left: 40%;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top: 4px solid #ff5722;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;

        &::before,
        &::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          border: 4px solid transparent;
        }
        &::before {
          top: 5px;
          left: 5px;
          right: 5px;
          bottom: 5px;
          border-top-color: #ff9800;
          -webkit-animation: spin 3s linear infinite;
          animation: spin 3.5s linear infinite;
        }
        &::after {
          top: 15px;
          left: 15px;
          right: 15px;
          bottom: 15px;
          border-top-color: #ffc107;
          -webkit-animation: spin 1.5s linear infinite;
          animation: spin 1.75s linear infinite;
        }

        @-webkit-keyframes spin {
          from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }

        @keyframes spin {
          from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `}
    ></div>
  );
}
