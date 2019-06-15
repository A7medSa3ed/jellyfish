import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Input from "../src/components/Input";

function Wrapper() {
  const [value, setValue] = React.useState("");

  return (
    <Input
      label="Name"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

storiesOf("Input", module).add("to Input", () => <Wrapper />);
