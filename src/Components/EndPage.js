import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../config.js";
import styles from "./style/taskStyle.module.css";
import buttonStyles from "./style/taskStyle.module.css";
/////////////////////////////////////////////////////////////////////
class EndPage extends React.Component {
  constructor(props) {
    super(props);

    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    // This will change for the questionnaires going AFTER the main task
    this.state = {
      // userID: this.props.location.state.userID, //debugger
      // startTime: this.props.location.state.startTime, //debugger
      userID: 12, //debugger
      startTime: 12, //debugger

      sectionStartTime: timeString,
      instructScreenText: 1,
      instructScreen: true,
      feedback: [],
      placeholder:
        "Were the task instructions clear? Did you encounter any problems?",
      // bonus: this.props.location.state.bonus,
      bonus: 12,
      study_part: 6,
    };
  }

  handleInstructLocal(key_pressed) {
    var curText = this.state.instructScreenText;
    var whichButton = key_pressed;

    if (whichButton === 4 && curText > 1 && curText <= 3) {
      this.setState({ instructScreenText: curText - 1 });
    } else if (whichButton === 5 && curText < 2) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (whichButton === 10 && curText === 2) {
      this.handleSubmit();
    }
  }

  // handle key key_pressed
  _handleInstructKey = (event) => {
    var key_pressed;

    switch (event.keyCode) {
      case 37:
        //    this is left arrow
        key_pressed = 4;
        this.handleInstructLocal(key_pressed);
        break;
      case 39:
        //    this is right arrow
        key_pressed = 5;
        this.handleInstructLocal(key_pressed);
        break;
      case 32:
        //    this is SPACEBAR
        key_pressed = 10;
        this.handleInstructLocal(key_pressed);
        break;
      default:
    }
  };

  handleChange = (event) => {
    this.setState({ instructScreenText: 3});
  };

  handleSubmit = (event) => {
    let body = {
      userID: this.state.userID,
      sectionStartTime: this.state.sectionStartTime,
      startTime: this.state.startTime,
      feedback: this.state.feedback,
      bonus: this.state.bonus,
    };
    try {
      fetch(
        `${API_URL}/end_info/create/` +
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
    } catch (e) {
      console.log("Cant post?");
    }
  };

  clearFb = () => {
    this.setState({ feedback: [], placeholder: "Thanks for your feedback!" });
  };

  openInNewTab(url) {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }

  componentDidMount() {
    this.handleSubmit();
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    let text;

    if (this.state.instructScreen === true) {
      if (this.state.instructScreenText === 1) {
        document.addEventListener("keyup", this._handleInstructKey);
        text = (
          <div className={styles.main}>
            <span className={styles.likeP}>
              <span className={styles.center}>THANK YOU</span>
              <br />
              Well done, you have earned ${this.state.bonus} as a bonus!
              <br /> <br />
              Thanks for your help!
              <br />
              <br />
              Your data makes an important contribution to our understanding of
              mental health.
              <br />
              In this study, we were interested in how you detect complex
              associations and how <br />
              you react when they change.
              <br />
              <br />
              <span className={styles.centerTwo}>
                [<strong>NEXT →</strong>]
              </span>
            </span>
          </div>
        );
      } else if (this.state.instructScreenText === 2) {
        text = (
          <div className={styles.main}>
            <span className={styles.likeP}>
              <span className={styles.center}>THANK YOU</span>
              <br />
              This was the last stage of our study. Thank you very much for your
              time and effort! We will process your data and soon be in touch
              about the payment.
              <br /> <br />
              Please click the button below to end the game.
              <br /> <br />
              <br /> <br />
              <button onClick={this.handleChange}>
              <span class="align-middle" >END GAME</span>
              </button>
              <br /> <br />
              <span className={styles.centerTwo}>
                [← <strong>BACK</strong>]
              </span>
            </span>
          </div>
        );
      } else if (this.state.instructScreenText === 3) {
        text = (
          <div className={styles.main}>
            <span className={styles.likeP}>
              <span className={styles.center}>THANK YOU</span>
              <br />
              <span className={styles.centerTwo}>
                <strong>You can now close this window.</strong>
              </span>
            </span>
          </div>
        );
      }
    }

    return (
      <div className={styles.cockpit}>
        <div className={styles.textblock}>{text}</div>
      </div>
    );
  }
}

export default withRouter(EndPage);
