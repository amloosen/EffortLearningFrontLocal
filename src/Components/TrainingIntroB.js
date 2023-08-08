import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
/////////////////////////////////////////////////////////////////////////////////
// REACT COMPONENT START
class TrainingIntroB extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date();
    var introTrainingStartTime = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
    this.state = {
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,

        // userID: 12,
        // date: 12,
        // startTime: 12,
      sectionStartTime: introTrainingStartTime,
      taskSessionTry: 1,
      taskSession: "TrainingIntroB",
      instructScreenText: 1,
      instructScreen: true,
    };

    this.handleInstructLocal = this.handleInstructLocal.bind(this);

    /* prevents page from going down when space bar is hit .*/
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
  // END COMPONENT STATE

  // This handles instruction screen within the component USING KEYBOARD
  handleInstructLocal(key_pressed) {
    var curText = this.state.instructScreenText;
    var whichButton = key_pressed;

    if (whichButton === 4 && curText > 1) {
      this.setState({ instructScreenText: curText - 1 });
    } else if (whichButton === 5 && curText < 4) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (curText === 4 && whichButton === 10) {
      this.redirectToNextStage();
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
  /////////////////////////////////////////////////////////////////////////////////
  redirectToNextStage = () => {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/TrainingTaskB`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    let text;
    if (this.state.instructScreen === true) {
      if (this.state.instructScreenText === 1) {
        document.addEventListener("keyup", this._handleInstructKey);
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING III</span>
              <br />
              You might have noticed that the percent on the instrument first
              mapped one-to-one onto the population size (40% → 40 million).
              <br />
              <br />
              After a while it switched to an inverse relationship (40% → 60 million),
              meaning you had to calculate '100 - instrument value' to get the
              population size.
              <br />
              <br />
              Finally, the population size corresponded to half of the value
              instrument value <br />
              (40% → 20 million).
              <br />
              <br />
              In the main game, these associations will become even more
              complex. You have to learn them and spot when they change to then adapt
              your answer. This poses the first challenge of the game.
              <br />
              <br />
              Click next to learn about another challenge.
              <br />
              <br />
              <span className={styles.center}>
                [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 2) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING III</span>
              <br />
              <br />
              The second challenge makes your mission even more difficult:
              <br />
              <br />
              Your spaceship has not only one but <strong>three</strong>{" "}
              measuring instruments showing different <br />
              natural resources that have different colours.
              <br />
              <br />
              You have to find out <strong>
                which single one is relevant
              </strong>{" "}
              and associated with the population size. <br />
              Only one instrument at a time is associated with the population
              size.
              <br />
              <br />
              <span className={styles.center}>
                [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 3) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING III</span>
              <br />
              <br />
              However, again, sometimes <strong>this might change</strong>,
              which means suddenly a new instrument <br />
              will be relevant. You have to recognize these changes and react to
              them.
              <br />
              <br />
              This means, your challenges are: <br />
              <br />
              You have to <br />
              <br />
              <strong>(1)</strong> find out which instrument is relevant, <br />
              <br />
              <strong>(2)</strong> how it is associated with the population
              size,
              <br />
              <br />
              <strong>(3)</strong> detect when suddenly a new instrument is
              relevant <br />
              or when the association with the population size changes.
              <br />
              <br />
              <span className={styles.center}>
                [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 4) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING III</span>
              Again, the true population size will be shown after you
              indicated your answer. <br /> <br /> This will make it possible
              for you to find out, which instrument is important <br />
              and how it is associated with the population size.
              <br />
              <br />
              For now, you will encounter two instruments. Find out which one is
              important <br />
              and how it is assocated with the population size.
              <br />
              <br />
              Indicate your estimate by pressing the corresponding left or
              right arrow key.
              <br />
              Click the [<strong>SPACEBAR</strong>] once you have seen the
              instruments for long enough.
              <br />
              <br />
              Let's practice this!
              <br /> <br />
              Press the [<strong>SPACEBAR</strong>] to start the training.
              <span className={styles.center}>
                [<strong>← BACK</strong>]
              </span>
            </p>
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

export default withRouter(TrainingIntroB);
