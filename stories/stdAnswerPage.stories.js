import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import StudentAnswersPage from "../src/pages/StudentAnswersPage";

storiesOf("StudentAnswersPage", module).add("to StudentAnswersPage", () => (
  <StudentAnswersPage />
));
