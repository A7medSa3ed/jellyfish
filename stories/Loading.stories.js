import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Loading from "../src/components/Loading";

storiesOf("Loading", module).add("to Loading", () => (
  <Loading text="please add your model answer" />
));
