import React from "react";
import Button from "@material-ui/core/Button";

import StdTable from "../components/StdTable";

export default function WelcomePage() {
  const [id, setID] = React.useState("");

  return (
    <>
      <StdTable
        answers={[
          { stdId: "140130", stdName: "AHmed", Grade: "55" },
          { stdId: "140130", stdName: "AHmed", Grade: "55" },
          { stdId: "140130", stdName: "AHmed", Grade: "55" },
          { stdId: "140130", stdName: "AHmed", Grade: "55" }
        ]}
      />
      <Button variant="contained" color="primary" style={{ margin: 20 }}>
        Submit
      </Button>
    </>
  );
}
