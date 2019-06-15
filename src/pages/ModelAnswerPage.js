import React from "react";
import Button from "@material-ui/core/Button";

import Table from "../components/Table";

export default function WelcomePage() {
  const [id, setID] = React.useState("");

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Table
          answers={[
            { questionNumber: "0", Answer: "B", Grade: "5" },
            { questionNumber: "0", Answer: "B", Grade: "5" },
            { questionNumber: "0", Answer: "B", Grade: "5" },
            { questionNumber: "0", Answer: "B", Grade: "5" },
            { questionNumber: "0", Answer: "B", Grade: "5" },
            { questionNumber: "0", Answer: "B", Grade: "5" }
          ]}
        />
        <Button variant="contained" color="primary" style={{ margin: 20 }}>
          Submit
        </Button>
      </div>
      <img src="https://via.placeholder.com/700" style={{}} />
    </div>
  );
}
