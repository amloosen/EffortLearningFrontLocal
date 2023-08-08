import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../config";
import { range } from "lodash";
import ElementsOneDisplay from "./ElementsOneDisplay";
import DisplayTrainElement from "./DisplayOneElement";
import DisplayTrainOptions from "./DisplayTrainOptions";
import DisplayTrainFeedback from "./DisplayTrainFeedback";
import Blue from "./img/stimuli3_blue.jpg";

////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
////////////////////////////////////////////////////////////////////////////////
class TrainingTaskA extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    var nr_traintrial = 12;
    var val_options = range(0, 110, 10);
    val_options.splice(val_options.indexOf(50), 1); //remove the 50 to make it clearer which element is correct
    var random_val = [];
    for (var i = 0; i <= nr_traintrial - 1; i++) {
      var val_tmp = val_options[~~(Math.random() * val_options.length)];
      do {
        var val_tmp = val_options[~~(Math.random() * val_options.length)];
      } while (random_val[i - 1] === val_tmp); // make sure it changes every time
      random_val[i] = val_tmp;
    }

    var corr_values = random_val.slice(0, 4);
    var inverse_tmp = random_val.slice(4, 8);
    var half_tmp = random_val.slice(8, 12);
    var inverse = inverse_tmp.map(function (value) {
      return 100 - value;
    });
    var half = half_tmp.map(function (value) {
      return value / 2;
    });
    corr_values.push(
      inverse[0],
      inverse[1],
      inverse[2],
      inverse[3],
      half[0],
      half[1],
      half[2],
      half[3]
    );
    let array_tmp = Array(nr_traintrial).fill(0);

    var corr_pos = [4, 4, 5, 5, 4, 4, 5, 5, 4, 4, 5, 5]; //1 is left and 2 is right; determine where the correct value is displayed
    shuffle(corr_pos);
    // initialize options for the first trial
    if (corr_pos[0] === 4) {
      var ansTwo = 100 - corr_values[0];
      var ansOne = corr_values[0];
    } else {
      var ansOne = 100 - corr_values[0];
      var ansTwo = corr_values[0];
    }

    this.state = {
      // sectionTime: timeString,
      // userID: this.props.location.state.userID,
      // date: this.props.location.state.date,
      // startTime: this.props.location.state.startTime,

      sectionTime: timeString,
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,

      taskSession: "TrainingTaskA",
      trialKeypress: array_tmp,
      valueOnElement: random_val,
      elements: 1,
      disp_opt: 0,
      traintrialNum: 1,
      traintrialTotal: nr_traintrial,
      feedback: 0,
      all_corr_values: corr_values,
      corr_value: corr_values[0],
      trainAcc: array_tmp,
      ansOne: ansOne,
      ansTwo: ansTwo,
      corr_pos: corr_pos,
      study_part: 2,
    };
    /* prevents page from going to the right/left when arrows are pressed .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 37 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    if (this.state.elements === 1) {
      return (
        <DisplayTrainElement
          valTrainElem={this.state.valueOnElement[this.state.traintrialNum - 1]}
          traintrialTotal={this.state.traintrialTotal}
          traintrialNum={this.state.traintrialNum}
          handleElement={this.elementsShown}
          blue={Blue}
        />
      );
    } else if (this.state.disp_opt === 1) {
      return (
        <DisplayTrainOptions
          ansTwo={this.state.ansTwo}
          ansOne={this.state.ansOne}
          trainIndic={this.trainIndic}
        />
      );
    } else if (this.state.feedback === 1) {
      return (
        <DisplayTrainFeedback
          corr_value={this.state.all_corr_values[this.state.traintrialNum - 1]}
          handleFeedback={this.feedbackShown}
        />
      );
    }
  }

  trainIndic = (pressed) => {
    var trainAcc = this.state.trainAcc;
    var trialKeypress = this.state.trialKeypress;
    trialKeypress[this.state.traintrialNum - 1] = pressed;

    if (pressed === this.state.corr_pos[this.state.traintrialNum - 1]) {
      trainAcc[this.state.traintrialNum - 1] = 1;
    } else {
      trainAcc[this.state.traintrialNum - 1] = 0;
    }

    this.setState({
      trialKeypress: trialKeypress,
      trainAcc: trainAcc,
      disp_opt: 0,
      feedback: 1,
    });
  };

  elementsShown = () => {
    this.setState({
      elements: 0,
      disp_opt: 1,
    });
  };

  feedbackShown = () => {
    if (this.state.traintrialNum === this.state.traintrialTotal) {
      this.redirectToNextStage();
    } else {
      var traintrialNum_tmp = this.state.traintrialNum + 1;
      var all_corr_values = this.state.all_corr_values;
      var corr_pos = this.state.corr_pos;
      if (corr_pos[traintrialNum_tmp - 1] === 4) {
        var ansTwo = 100 - all_corr_values[traintrialNum_tmp - 1];
        var ansOne = all_corr_values[traintrialNum_tmp - 1];

        if (ansOne === ansTwo) {
          ansTwo = ansTwo - 10;
        }
      } else {
        var ansOne = 100 - all_corr_values[traintrialNum_tmp - 1];
        var ansTwo = all_corr_values[traintrialNum_tmp - 1];

        if (ansOne === ansTwo) {
          ansOne = ansOne - 10;
        }
      }

      this.setState({
        traintrialNum: traintrialNum_tmp,
        elements: 1,
        disp_opt: 0,
        feedback: 0,
        ansTwo: ansTwo,
        ansOne: ansOne,
      });
    }
  };

  redirectToNextStage() {
    let body = {
      sectionStartTime: this.state.sectionTime,
      startTime: this.state.startTime,
      corr_pos: this.state.corr_pos,
      all_corr_values: this.state.all_corr_values,
      valueOnElement: this.state.valueOnElement,
      trainAcc: this.state.trainAcc,
    };

    fetch(
      `${API_URL}/training_a/create/` +
        this.state.userID +
        `/` +
        this.state.study_part,
      {
        //eigentlich auch in den body beim ersten mal
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    ////////////////////////
    this.props.history.push({
      pathname: `/TrainingIntroB`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  }
}

/////////////////////////////////////////////////////////////////////////////////

export default withRouter(TrainingTaskA);
