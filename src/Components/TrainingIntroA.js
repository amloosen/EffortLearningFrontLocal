import React from "react";
import ReactDOM from "react-dom";
import GifPlayer from "react-gif-player";
import "./style/gifplayer.scss";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import img_intro1 from "./intro/ExamplePicture1.jpg";
import img_left from "./intro/left.jpg";
import img_right from "./intro/right.jpg";
import gif from "./intro/mouse.gif";
import Cover from "./img/cover.jpg";
/////////////////////////////////////////////////////////////////////////////////t.Component {
class TrainingIntroA extends React.Component {
  constructor(props) {
    super(props);

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
    this.state = {
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      taskSession: "TrainingIntroA",
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
    } else if (whichButton === 5 && curText < 7) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (curText === 7 && whichButton === 10) {
      this.redirectToNextStage();
    }
  }

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

  redirectToNextStage = () => {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/TrainingTaskA`,
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

  render() {
    let text;
    if (this.state.instructScreen === true) {
      if (this.state.instructScreenText === 1) {
        document.addEventListener("keyup", this._handleInstructKey);
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              <br />
              Well done so far!
              <br /> <br />
              We will now introduce you to the main task itself and you will
              complete a few training trials.
              <br /> <br />
              For today&apos;s game, you will be a space explorer on an
              intergalactic mission. Your mission is it <br />
              to tell your station on earth how many aliens live on the planets
              you visit.
              <br />
              <br />
              It is critical that you give your best estimate of the alien
              population size.
              <br /> <br />
              <span className={styles.center}>
                <i>(Use the ← → keys to navigate the pages.)</i>
              </span>
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
              <span className={styles.center}>TRAINING II</span>
              So how can you find out how many aliens live on a planet?
              <br />
              <br />
              You can find out how large the population size is by looking at
              the different coloured resources
              <br />
              available on the planet.
              <br />
              <br />
              Your spaceship is equipped with several measuring instruments that
              will help you determine
              <br />
              how much of each resource is available.
              <br />
              <br />A measuring instrument may look like this:
              <br />
              <br />
              <span className={styles.center}>
                <img src={img_intro1} alt="example1" />
              </span>
              <br />
              This instrument indicates 40% of the blue resource is available.
              <br />
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 3) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              <br />
              As mentioned, the aliens living on these planets rely on natural
              resources,
              <br />
              and thus the population size is related to the measurement of your
              instrument.
              <br />
              <br />
              For example, the reading of the instrument could be reflecting the
              population size <br />
              (in million) one-to-one. This would mean that if the instrument
              shows you ‘40%’ 40 million aliens <br />
              live on that planet.
              <br />
              <br />
              It could also be, that the reading of the instrument could be
              reflecting the population size <br />
              times two. This would mean that if the instrument shows you ‘40%’
              80 million aliens <br />
              live on that planet. <br />
              <br />
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 4) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              <br />
              A challenge makes your mission difficult:
              <br />
              <br />
              No one knows how the instrument readings map onto the population
              size of the planet.
              <br />
              The association between the instrument reading and the population
              size <br />
              will be <strong>complex</strong> and also <strong>change</strong>{" "}
              at some point once you enter a new galaxy.
              <br />
              <br />
              It is your task to learn the associations and notice when it
              changes because you entered a <br />
              new galaxy.
              <br /> <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 5) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              To introduce you to the game slowly, we will now show you the
              changing association
              <br />
              by, for now, only showing you one instrument. <br />
              <br />
              This instrument is associated with the population size in a simple
              way but this association will change <br />
              at some point, when you get to a new galaxy. <br />
              You have to notice that and adapt your answer.
              <br />
              <br />
              First, uncover the instrument by{" "}
              <strong>hovering over the black square with your mouse.</strong>
              <br />
              Click 'play' to see how.
              <br /> <br />
              <span className={styles.center}>
                <GifPlayer gif={gif} still={Cover} />
              </span>
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 6) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              <br />
              <br />
              You then have to choose between the two alternative population
              sizes on the screen using the <br />
              corresponding arrow keys.
              <br /> For the option on the left side use the left arrow key
              <img
                className={styles.introImgTwo2}
                src={img_left}
                alt="example1"
              />
              <br />
              and for the option on the right use the right arrow key
              <img
                className={styles.introImgTwo2}
                src={img_right}
                alt="example1"
              />
              <br />
              <br />
              <br /> <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 7) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              <br />
              After you indicated your answer, we will show you how many aliens
              actually lived on the planet.
              <br />
              This will make it possible for you to learn how the instrument
              relates to the alien population size.
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

export default withRouter(TrainingIntroA);
