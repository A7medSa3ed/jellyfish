/** @jsx jsx */
import React from "react";
// import Button from "@material-ui/core/Button";

import ErrorPopup from "../components/ErrorPopup";
import Input from "../components/Input";
import Dropzone from "../components/Dropzone";
import Loading from "../components/Loading";
import { parseConfidenceArray } from "../core";
import { resulti } from "resulti";
import { css, jsx } from "@emotion/core";

// import { maxWidth } from "@material-ui/system";

export default function WelcomePage({
  success,
  papers,
  setPapers,
  model,
  setModel,
  id,
  setId
}) {
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  let paperCount = "";
  if (papers) {
    paperCount = papers.length + " papers";
  }
  return (
    <div>
      <ErrorPopup error={error} setError={setError} />
      {submitted ? (
        <Loading />
      ) : (
        <div
          css={css`
            margin: 50px auto;
            @media (min-width: 250px) and (max-width: 767) {
              width: 150px;
              margin: 60px auto;
            }
            @media (min-width: 768px) {
              width: 750px;
            }
            @media (min-width: 992px) {
              width: 970px;
            }
            @media (min-width: 1200px) {
              width: 1170px;
            }
          `}
        >
          <Input value={id} onChange={e => setId(e.target.value)} />
          <Dropzone
            text={`Select model answer: ${(model && model.path) || ""}`}
            setFiles={file =>
              file.length > 1 || file.length < 1
                ? setError("Must upload only one model answer!")
                : setModel(file[0])
            }
          />
          <Dropzone
            text={`Select student answers: ${paperCount}`}
            setFiles={files =>
              files.length
                ? setPapers(files)
                : setError("Please upload any file")
            }
          />
          <button
            // variant="contained"
            // color="primary"
            css={css`
              width: 40%;
              margin: 0px 30%;
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
            `}
            disabled={!(id && model && papers)}
            onClick={() => {
              const data = new FormData();
              data.append("paper", model, model.name);

              fetch("http://localhost:8000/upload/", {
                method: "POST",
                body: data
              })
                .then(response => response.json())
                .then(({ mcq, true_false }) => {
                  const resultMCQ = mcq.reduce(
                    parseConfidenceArray("mcq"),
                    resulti([])
                  );
                  if (resultMCQ.isErr()) {
                    setModel(null);
                    setSubmitted(false);
                    throw resultMCQ.unwrapErr();
                  }

                  const resultTrueOrFalse = true_false.reduce(
                    parseConfidenceArray("true_false"),
                    resulti([])
                  );
                  if (resultTrueOrFalse.isErr()) {
                    setModel(null);
                    setSubmitted(false);
                    throw resultTrueOrFalse.unwrapErr();
                  }

                  return {
                    mcq: resultMCQ.unwrap(),
                    true_false: resultTrueOrFalse.unwrap()
                  };
                })
                .then(success)
                .catch(setError);

              setSubmitted(true);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
