import React from "react";
import Button from "@material-ui/core/Button";

import StudentTable from "../components/StudentTable";

export default function StudentAnswersPage() {
  const [id, setID] = React.useState("");

  return (
    <>
      <StudentTable
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
