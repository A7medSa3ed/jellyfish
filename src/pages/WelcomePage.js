import React from "react";
import Button from "@material-ui/core/Button";

import ErrorPopup from "../components/ErrorPopup";
import Input from "../components/Input";
import Dropzone from "../components/Dropzone";

const identity = () => {};

export default function WelcomePage(success = identity) {
  const [error, setError] = React.useState("");
  const [id, setID] = React.useState("");
  const [model, setModel] = React.useState(null);
  const [studentAnswers, setStudentAnswers] = React.useState(null);

  let paperCount = "";
  if (studentAnswers) {
    paperCount = studentAnswers.length + " paper";
  }

  return (
    <>
      <ErrorPopup error={error} setError={setError} />
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
            ? setStudentAnswers(files)
            : setError("Please upload any file")
        }
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!(id && model && studentAnswers)}
        style={{ margin: 20 }}
        onClick={() => {
          const data = new FormData();
          data.append("id", id);
          data.append("model", model, model.name);

          studentAnswers.forEach(file =>
            data.append("answers[]", file, file.name)
          );

          fetch("/upload", {
            method: "POST",
            body: data
          })
            .then(success)
            .catch(setError);
        }}
      >
        Submit
      </Button>
    </>
  );
}
