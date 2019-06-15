import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import StdTable from "../src/components/StdTable";

storiesOf("StdTable", module).add("to StdTable", () => (
  <StdTable
    answers={[
      { stdId: "140130", stdName: "AHmed", Grade: "55" },
      { stdId: "140130", stdName: "AHmed", Grade: "55" },
      { stdId: "140130", stdName: "AHmed", Grade: "55" },
      { stdId: "140130", stdName: "AHmed", Grade: "55" }
    ]}
  />
));
