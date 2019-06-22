import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import WelcomePage from "../src/pages/WelcomePage";
import ModelAnswerPage from "../src/pages/ModelAnswerPage";
import StudentAnswersPage from "../src/pages/StudentAnswersPage";
import StudentPage from "../src/pages/StudentPage";

storiesOf("pages", module)
  .add("to WelcomePage", () => {
    return <WelcomePage />;
  })
  .add("to StudentAnswersPage", () => <StudentAnswersPage />)
  .add("to ModelAnswerPage", () => {
    return (
      <ModelAnswerPage
        answers={{
          mcq: [
            {
              questionNumber: 0,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 1,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 2,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 3,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 4,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            }
          ],
          true_false: [
            { questionNumber: 0, answers: [true, true] },
            { questionNumber: 1, answers: [true, true] },
            { questionNumber: 2, answers: [true, true] },
            { questionNumber: 3, answers: [true, true] }
          ]
        }}
      />
    );
  })
  .add("to StudentPage", () => {
    return (
      <StudentPage
        answers={{
          mcq: [
            {
              questionNumber: 0,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 1,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 2,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 3,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 4,
              answers: [true, true, false, false, false, false]
            },
            {
              questionNumber: 5,
              answers: [true, true, false, false, false, false]
            }
          ],
          true_false: [
            { questionNumber: 0, answers: [true, true] },
            { questionNumber: 1, answers: [true, true] },
            { questionNumber: 2, answers: [true, true] },
            { questionNumber: 3, answers: [true, true] },
            { questionNumber: 0, answers: [true, true] },
            { questionNumber: 1, answers: [true, true] },
            { questionNumber: 2, answers: [true, true] },
            { questionNumber: 3, answers: [true, true] }
          ]
        }}
      />
    );
  });
