import React from "react";
import { API_URL } from "../config";
import DisplaySliderTrainer from "./DisplaySliderTrainer";

/////////////////////////////////////////////////////////////////////////////////
class SliderTraining extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    let practSgmMu = Array(7)
      .fill()
      .map(() => Array(3).fill(0));
    let practRT = Array(7)
      .fill()
      .map(() => Array(3).fill(0));


    this.state = {
      sectionTime: timeString,
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      taskSession: "SliderTraining",
      practTotal: 7,
      practNum: 1,
      practRT: practRT,
      practSgmMu: practSgmMu,
      timerCountDur: 10,
      startSgm: 50,
      startMu: 50,
      study_part:1
    };
    this.redirectToNextStage = this.redirectToNextStage.bind(this);

    /* prevents page from going to the right/left when arrows are pressed .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 37 && e.target === document.body) {
        e.preventDefault();
      } else if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
  }

  componentWillUnmount() {


  }

  /////////////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <DisplaySliderTrainer
        trialSgmMu={this.state.practSgmMu}
        trialRT={this.state.practRT}
        practNum={this.state.practNum}
        startSgm={this.state.startSgm}
        startMu={this.state.startMu}
        onSliderEnd={this.handleSliderData}
        practNum={this.state.practNum}
      />
    );
  }
  /////////////////////////////////////////////////////////////////////////////////
  handleSliderData = (result, time) => {

    if (this.state.practNum === this.state.practTotal) {
      this.redirectToNextStage();
    } else {
      this.setState({
        practSgmMu: result,
        practRT: time,
        practNum: this.state.practNum + 1,
      });
    }
  };


  redirectToNextStage() {
    let body = {
      sectionStartTime: this.state.sectionTime,
      startTime: this.state.startTime,
      practSgmMu: this.state.practSgmMu,
      practNum: this.state.practNum
    };

    fetch(
      `${API_URL}/slider_training/create/` +
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
      pathname: `/TrainingIntroA`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime
      },
    });

    // console.log("UserID is: " + this.state.userID);
  }
}

export default SliderTraining;
