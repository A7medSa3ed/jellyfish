import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Table from "../src/components/Table";

storiesOf("Table", module).add("to Table", () => (
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
));
