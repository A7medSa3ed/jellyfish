import React from "react";
import Button from "@material-ui/core/Button";

import ErrorPopup from "../components/ErrorPopup";
import Input from "../components/Input";
import Dropzone from "../components/Dropzone";
import Loading from "../components/Loading";
import { parseConfidenceArray } from "../core";
import { resulti } from "resulti";

export default function WelcomePage({
  success,
  papers,
  setPapers,
  model,
  setModel
}) {
  const [error, setError] = React.useState("");
  const [id, setID] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  let paperCount = "";
  if (papers) {
    paperCount = papers.length + " papers";
  }

  return (
    <>
      <ErrorPopup error={error} setError={setError} />
      {submitted ? (
        <Loading />
      ) : (
        <>
          <Input
            label="Subject ID"
            value={id}
            onChange={e => setID(e.target.value)}
          />
          <Dropzone
            text={`Input model answer: ${(model && model.path) || ""}`}
            setFiles={file =>
              file.length > 1 || file.length < 1
                ? setError("Must upload only one model answer!")
                : setModel(file[0])
            }
          />
          <Dropzone
            text={`Input student answers: ${paperCount}`}
            setFiles={files =>
              files.length
                ? setPapers(files)
                : setError("Please upload any file")
            }
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!(id && model && papers)}
            style={{ margin: 20 }}
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
          </Button>
        </>
      )}
    </>
  );
}
