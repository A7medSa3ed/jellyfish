import React from "react";
import Button from "@material-ui/core/Button";

import Input from "../components/Input";
import Dropzone from "../components/Dropzone";

export default function WelcomePage() {
  const [id, setID] = React.useState("");

  return (
    <>
      <Input label="Subject ID" value={id} onChange={setID} />
      <Dropzone text="Input model answer" />
      <Dropzone text="Input student answers" />
      <Button variant="contained" color="primary" style={{ margin: 20 }}>
        Submit
      </Button>
    </>
  );
}
