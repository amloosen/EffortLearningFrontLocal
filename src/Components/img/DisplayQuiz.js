import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import Quiz from "./Quiz";
import "./style/quizStylesAdapt.css";

class DisplayQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      showIntro: 1,
      showQuiz: 0,
      nextRound: 0,
      allCorrect: 0,
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
          this.redirectToNextStage();
        }
        break;
      default:
    }
  };
  componentDidMount() {
    document.addEventListener("keyup", this.handleStartKey);
  }

  componentWillUnmount() {
    clearTimeout(this.timerRound);
    document.removeEventListener("keyup", this.handleStartKey);
  }

  componentDidUpdate() {
    if (this.state.nextRound == 1) {
      this.timerRound = setTimeout(() => {
        this.nextRound();
      }, 3000);
    }
    if (this.state.allCorrect === 1) {
      document.addEventListener("keyup", this.handleStartKey);
    }
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
      // this.redirectToNextStage();
    } else if (score < 5) {
      this.setState({
        showQuiz: 0,
        nextRound: 1,
      });
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
    } else if (this.state.nextRound === 1) {
      let text = (
        <div className={styles.main}>
          <p>
            <br />
            You unfortunately, made some mistakes.
            <br />
            <br />
            Try again!
            <br />
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
            now complete a short quiz.
            <br />
            Answer all questions correctly in order to proceed to the main game.
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
  redirectToNextStage(h) {
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
export default withRouter(DisplayQuiz);
