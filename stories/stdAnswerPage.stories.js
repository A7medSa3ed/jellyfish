import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import StdAnswerPage from "../src/pages/StdAnswerPage";

storiesOf("StdAnswerPage", module).add("to StdAnswerPage", () => (
  <StdAnswerPage />
));
