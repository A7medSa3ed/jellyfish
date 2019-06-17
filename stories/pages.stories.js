import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import WelcomePage from "../src/pages/WelcomePage";
import ModelAnswerPage from "../src/pages/ModelAnswerPage";

storiesOf("pages", module)
  .add("to WelcomePage", () => {
    return <WelcomePage />;
  })
  .add("to ModelAnswerPage", () => {
    return (
      <ModelAnswerPage
        answers={{
          mcq: [
            { questionNumber: 0, Answer: "B" },
            { questionNumber: 1, Answer: "B" },
            { questionNumber: 2, Answer: "B" },
            { questionNumber: 3, Answer: "B" },
            { questionNumber: 4, Answer: "B" },
            { questionNumber: 5, Answer: "B" }
          ],
          trueOrFalse: [
            { questionNumber: 0, Answer: "T" },
            { questionNumber: 1, Answer: "F" },
            { questionNumber: 2, Answer: "T" },
            { questionNumber: 3, Answer: "T" }
          ]
        }}
      />
    );
  });
