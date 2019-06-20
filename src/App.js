import React from "react";

import WelcomePage from "./pages/WelcomePage";
import ModelAnswerPage from "./pages/ModelAnswerPage";
import StudentGradesPage from "./pages/StudentGradesPage";

const initialState = {
  page: "welcome",
  papers: null,
  model: null,
  modelAnswer: null,
  grades: null
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "WELCOME_LOAD_PAPERS":
      return { ...state, papers: action.papers };
    case "WELCOME_LOAD_MODEL":
      return { ...state, model: action.model };
    case "WELCOME_SUBMIT":
      return {
        ...state,
        page: "model_answer",
        modelAnswer: action.modelAnswer
      };
    case "MODEL_ANSWER_SUBMIT":
      return {
        ...state,
        page: "students_table",
        grades: action.grades
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  switch (state.page) {
    case "welcome":
      return (
        <WelcomePage
          success={modelAnswer =>
            dispatch({ type: "WELCOME_SUBMIT", modelAnswer })
          }
          papers={state.papers}
          setPapers={papers =>
            dispatch({ type: "WELCOME_LOAD_PAPERS", papers })
          }
          model={state.model}
          setModel={model => dispatch({ type: "WELCOME_LOAD_MODEL", model })}
        />
      );
    case "model_answer":
      return (
        <ModelAnswerPage
          success={grades => dispatch({ type: "MODEL_ANSWER_SUBMIT", grades })}
          answers={state.modelAnswer}
          model={state.model}
        />
      );
    case "students_table":
      return (
        <StudentGradesPage
          // success={grades => dispatch({ type: "MODEL_ANSWER_SUBMIT", grades })}
          answers={state.modelAnswer}
          papers={state.papers}
          grades={state.grades}
        />
      );
    default:
      throw Error(`Unexpected page name ${state.page}`);
  }
}

export default App;
