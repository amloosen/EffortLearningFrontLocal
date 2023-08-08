import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartPage from "./Components/StartPage";
import SliderIntro from "./Components/SliderIntro";
import SliderTraining from "./Components/SliderTraining";
import TrainingIntroA from "./Components/TrainingIntroA";
import TrainingTaskA from "./Components/TrainingTaskA";
import TrainingIntroB from "./Components/TrainingIntroB";
import TrainingTaskB from "./Components/TrainingTaskB";
import TrainingIntroC from "./Components/TrainingIntroC";
import TrainingTaskC from "./Components/TrainingTaskC";
import DisplayQuiz from "./Components/DisplayQuiz";
import MainTaskIntro from "./Components/MainTaskIntro";
import MainTask from "./Components/MainTask";
import EndPage from "./Components/EndPage";


import MainTaskAdapted from "./Components/MainTaskAdapted";




import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/SliderIntro" component={SliderIntro} exact />
        <Route path="/sliderTraining" component={SliderTraining} exact />
        <Route path="/TrainingIntroA" component={TrainingIntroA} exact />
        <Route path="/TrainingIntroB" component={TrainingIntroB} exact />
        <Route path="/TrainingIntroC" component={TrainingIntroC} exact />
        <Route path="/MainTaskIntro" component={MainTaskIntro} exact />
        <Route path="/DisplayQuiz" component={DisplayQuiz} exact />
        <Route path="/TrainingTaskA" component={TrainingTaskA} exact />
        <Route path="/TrainingTaskB" component={TrainingTaskB} exact />
        <Route path="/TrainingTaskC" component={TrainingTaskC} exact />
        <Route path="/MainTask" component={MainTask} exact />
        <Route path="/EndPage" component={EndPage} exact />


        <Route path="/MainTaskAdapted" component={MainTaskAdapted} exact />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
