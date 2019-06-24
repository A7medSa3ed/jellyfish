import React from "react";

import WelcomePage from "./pages/WelcomePage";
import ModelAnswerPage from "./pages/ModelAnswerPage";
import StudentGradesPage from "./pages/StudentGradesPage";
import Jellyfish from "./components/Jellyfish";

const initialState = {
  page: "intro",
  id: "",
  top: false,
  papers: null,
  model: null,
  modelAnswer: null,
  grades: null
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "INTRO_START":
      return { ...state, top: true };
    case "INTRO_END":
      return { ...state, page: "welcome" };
    case "WELCOME_ID_CHANGE":
      return { ...state, id: action.id };
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
    case "RESET":
      return {
        ...initialState,
        page: "welcome",
        top: true
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    let id = null;
    if (state.top) {
      id = setTimeout(() => {
        dispatch({ type: "INTRO_END" });
      }, 1000);
    } else {
      id = setTimeout(() => {
        dispatch({ type: "INTRO_START" });
      }, 1000);
    }
    return () => clearTimeout(id);
  }, [state.top]);

  function reset() {
    dispatch({ type: "RESET" });
  }

  const jellyfish = (
    <Jellyfish top={state.top} key="jellyfish" onClick={reset} />
  );

  switch (state.page) {
    case "intro":
      return jellyfish;
    case "welcome":
      return (
        <>
          {jellyfish}
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
            id={state.id}
            setId={id => dispatch({ type: "WELCOME_ID_CHANGE", id })}
          />
        </>
      );
    case "model_answer":
      return (
        <>
          {jellyfish}
          <ModelAnswerPage
            success={grades =>
              dispatch({ type: "MODEL_ANSWER_SUBMIT", grades })
            }
            answers={state.modelAnswer}
            model={state.model}
          />
        </>
      );
    case "students_table":
      return (
        <>
          {jellyfish}
          <StudentGradesPage
            modelAnswer={state.modelAnswer}
            papers={state.papers}
            grades={state.grades}
            subjectId={state.id}
          />
        </>
      );
    default:
      throw Error(`Unexpected page name ${state.page}`);
  }
}

export default App;
