import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../config";
import styles from "./style/taskStyle.module.css";
import Quiz from "./Quiz";
import "./style/quizStylesAdapt.css";

class DisplayQuiz extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    this.state = {
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      // userID: 12,
      // date: 12,
      // startTime: 12, //debugger
      sectionTime: timeString,
      showIntro: 1,
      showQuiz: 0,
      nextRound: 0,
      allCorrect: 0,
      repeatNum: 0,
      reStart: this.props.location.state.reStart,
      study_part: 100,
    };
  }
  handleStartKey = (event) => {
    var key_pressed;

    switch (event.keyCode) {
      case 32:
        //    this is SPACEBAR
        key_pressed = 10;
        if (this.state.allCorrect === 0) {
          this.setState({ showIntro: 0, showQuiz: 1 });
        } else {
          this.redirectToNextStage(0);
        }
        break;
      default:
    }
  };
  componentDidMount() {
    document.addEventListener("keyup", this.handleStartKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleStartKey);
  }

  componentDidUpdate() {
    document.addEventListener("keyup", this.handleStartKey);
  }

  nextRound = () => {
    this.setState({
      showQuiz: 1,
      nextRound: 0,
    });
  };

  quizCompleted = (score) => {
    if (score === 5) {
      this.setState({
        showQuiz: 0,
        nextRound: 0,
        allCorrect: 1,
      });
    } else if (score < 5) {
      var repeat = this.state.repeatNum;
      repeat = repeat + 1;
      if (repeat > 1) {
        this.redirectToNextStage(1);
      } else {
        this.setState({
          showQuiz: 0,
          nextRound: 1,
          repeatNum: repeat,
        });
      }
    }
  };

  render() {
    let text;

    if (this.state.showQuiz) {
      return (
        <div className={styles.cockpit}>
          <div className={styles.quiztext}>
            <br />
            Please use your mouse to click on the correct answer.
            <br /> <br />
          </div>
          <Quiz onQuizEnd={this.quizCompleted} />
        </div>
      );
    } else if (this.state.nextRound === 1 && this.state.repeatNum === 1) {
      let text = (
        <div className={styles.main}>
          <p>
            <br />
            You unfortunately, made some mistakes.
            <br />
            <br />
            You will get a second chance to complete the quiz. Please answer the
            questions carefully. <br />
            If you are unable to complete your second attempt without mistakes,
            you will automatically be sent back to the last training stage. This
            is to ensure you fully understood the game before you start it.
            <br />
            <br />
            Good luck!
            <br />
            <br />
            <span className={styles.center}>
              Press the [<strong>SPACEBAR</strong>] to start the second time.
            </span>
          </p>
        </div>
      );
      return (
        <div className={styles.cockpit}>
          <div className={styles.textblock}>{text}</div>
        </div>
      );
    } else if (this.state.allCorrect === 1) {
      let text = (
        <div className={styles.main}>
          <p>
            <br />
            Congratulations, you succesfully passed the quiz and will now start
            the main game.
            <br />
            <br />
            Good luck!
            <br />
            <br />
            <span className={styles.center}>
              Press the [<strong>SPACEBAR</strong>] to continue.
            </span>
            <br />
          </p>
        </div>
      );
      return (
        <div className={styles.cockpit}>
          <div className={styles.textblock}>{text}</div>
        </div>
      );
    } else if (this.state.showIntro === 1) {
      let text = (
        <div className={styles.main}>
          <p>
            <br />
            Good job, you are done with all the trainings.
            <br />
            <br />
            To make sure you understood the game and its challenges, you will
            now complete a short quiz. Answer all questions correctly in order
            to proceed to the main game.
            <br />
            <br />
            You will get two attempts to complete the quiz. After that, you will
            be sent back to the last training stage. This is to ensure you fully
            understood the game.
            <br />
            <br />
            Good luck!
            <br />
            <br />
            <span className={styles.center}>
              Press the [<strong>SPACEBAR</strong>] to start.
            </span>
            <br />
          </p>
        </div>
      );
      return (
        <div className={styles.cockpit}>
          <div className={styles.textblock}>{text}</div>
        </div>
      );
    }
  }
  redirectToNextStage(r) {
    var currentDate = new Date(); // maybe change to local
    var endTime = currentDate.toTimeString();

    let body = {
      sectionStartTime: this.state.sectionTime,
      startTime: this.state.startTime,
      sectionEndTime: endTime,
      timesRepeated: this.state.repeatNum,
      timesRestarted: this.state.reStart,
    };

    fetch(
      `${API_URL}/quiz/create/` +
        this.state.userID +
        `/` +
        this.state.study_part,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    ////////////////////////
    if (r === 1) {
      var reStart = this.state.reStart;
      reStart = reStart + 1;
      this.props.history.push({
        pathname: `/TrainingIntroC`,
        state: {
          userID: this.state.userID,
          date: this.state.date,
          startTime: this.state.startTime,
          reStart: reStart,
        },
      });
    } else {
      this.props.history.push({
        pathname: `/MainTaskIntro`,
        state: {
          userID: this.state.userID,
          date: this.state.date,
          startTime: this.state.startTime,
        },
      });
    }
  }
}
export default withRouter(DisplayQuiz);
