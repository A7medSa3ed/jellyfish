import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import WelcomePage from "../src/pages/WelcomePage";

storiesOf("WelcomePage", module).add("to WelcomePage", () => {
  // const [id, setID] = React.useState("")

  return <WelcomePage />;
});
