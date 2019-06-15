import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Dropzone from "../src/components/Dropzone";

storiesOf("Dropzone", module).add("to Dropzone", () => (
  <Dropzone text="please add your model answer" />
));
