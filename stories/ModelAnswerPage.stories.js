import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import ModelAnswerPage from "../src/pages/ModelAnswerPage";

storiesOf("ModelAnswerPage", module).add("to ModelAnswerPage", () => (
  <ModelAnswerPage />
));
