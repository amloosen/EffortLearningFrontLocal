import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import img_intro1 from "./intro/ExamplePicture1.jpg";
import img_bar from "./intro/bar.jpg";
import img_slider2 from "./intro/SliderExamplePoint.jpg";
import img_slider3 from "./intro/SliderExampleLine.jpg";
import img_correctcert from "./intro/correctcert.jpg";
import img_correctunc from "./intro/correctunc.jpg";
import img_sliderwrongunc from "./intro/sliderwrongunc.jpg";
import img_sliderwrongcert from "./intro/sliderwrongcert.jpg";

/////////////////////////////////////////////////////////////////////////////////
// REACT COMPONENT START
class TrainingIntroC extends React.Component {
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
      sectionStartTime: introTrainingStartTime,
      taskSessionTry: 1,
      taskSession: "TrainingIntroC",
      instructScreenText: 1,
      instructScreen: true,
      reStart: this.props.location.state.reStart,
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
    } else if (whichButton === 5 && curText < 10) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (curText === 10 && whichButton === 10) {
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
      pathname: `/TrainingTaskC`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
        reStart: this.state.reStart,
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              Congrats, you have reached the last training stage!
              <br />
              <br />
              You have now learned about the main challenges of our game.
              <br />
              <br />
              Lets recap:
              <br />- <strong>Only one</strong> instrument is associated with
              the population size at a given time.
              <br />- At some point, the{" "}
              <strong> important instrument changes</strong> and a new
              instrument is important.
              <br />- You have to learn <strong>how</strong> the important
              instrument is associated with the population size.
              <br />- You have to recognize{" "}
              <strong>when this association changes</strong>. The same instrument
              might still be important but in a different way.
              <br />
              <br />
              All these challenges make up a puzzle that you can solve by
              looking at the values on the instruments and the feedback you get
              after each planet.
              <br />
              <br />
              All parts of the game you have been introduced to will now be put
              together.
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              To make the game more exciting, we will show you three instead of
              two instruments.
              <br />
              <br />
              Again, you have to find out <br />
              <br />
              <strong>(1)</strong> which instrument is important and <br />
              <strong>(2)</strong> how it is associated with the population
              size. <br />
              <br />
              This association as well as the instrument of importance will
              <br /> <strong>(3)</strong> change over time. <br />
              <br />
              Detect these changes and adapt the number you estimate
              accordingly.
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              In addition, the associations between the instruments and the
              population size <br />
              will be <strong>more complex</strong> from now on.
              <br />
              <br />
              To slowly introduce you to this level of difficulty, we will help
              you during this final training stage. We will show you which of
              the three instruments is <strong>important</strong> by
              highlighting it with a green frame like this:
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.relevInd}
                  src={img_intro1}
                  alt="example1"
                />
              </span>
              <br />
              Make sure to notice the change. At some point, a new instrument
              will be important and you should adapt your answer. <br />
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              <strong>An additional hint:</strong>
              <br />
              <br />
              As you might have noticed in the previous training sessions,
              planets (trials) that you encounter after each other, are more
              similar to each other than planets that are further apart.
              <br /> <br />
              This means, their population size depends on the same instrument
              in the same way. After a while, when you enter new galaxies, this
              changes and the association between the instrument and the
              population size changes or a completely new instrument is
              important.
              <br /> <br />
              Keep this in mind when indicating your answers.
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
              <span className={styles.center}>TRAINING IV</span>
              From now on, you will be asked to use the slider. Remember, with
              the slider you can indicate{" "}
              <strong>the number you estimate</strong>, by changing the peak of
              the slider
              <br /> <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider2}
                  alt="example1"
                />
              </span>
              and your <strong> certainty</strong> in this number by changing
              the shape of the slider.
              <br /> <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider3}
                  alt="example1"
                />
              </span>
              <span className={styles.center}>
                [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 6) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING IV</span>
              <br />
              So keep in mind: Not only the number you estimate is
              important, but also your certainty in this number that you
              indicate. <br />
              <br />
              After each trial, you will be rewarded for the accuracy of your
              answer and your certainty in it. This reward will be indicated by
              a bar that looks like this: <br />
              <br />
              <span className={styles.center}>
                <img src={img_bar} alt="bar" />
              </span>
              During this training stage, the collected reward is for
              demonstration purposes only and will be deleted after the
              training. <br />
              <br />
              In the main task, this reward will determine your bonus payment,
              so try to indicate your estimated number and certainty as
              precisely as possible. Press 'NEXT' to learn how to optimize it.
              <br />
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
              <span className={styles.introImgTwo} className={styles.center}>
                TRAINING IV
              </span>
              The bar will rise at the position where the true population size{" "}
              would have been indicated up to the height of the slider. To
              clarify, look what happens if the true population size is 50
              million and you indicated this with high certainty: The bar
              reaches its maximum height.
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_correctcert}
                  alt="bar"
                />
              </span>
              In contrast, look what happens if the true population size is 50
              million and you indicated this with low certainty: The bar reaches
              a way lower height.
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_correctunc}
                  alt="bar"
                />
              </span>
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 8) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.introImgTwo} className={styles.center}>
                TRAINING IV
              </span>
              However, look what happens if you indicated a wrong value with
              high certainty <br />
              and slider did not cover 50 at all: The bar does not rise.
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_sliderwrongcert}
                  alt="bar"
                />
              </span>
              <br />
              And finally, look what happens if you indicated a wrong value with
              low certainty <br />
              and the slider still covers the correct value of 50: The bar rises
              a little bit.
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_sliderwrongunc}
                  alt="bar"
                />
              </span>
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 9) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.introImgTwo} className={styles.center}>
                TRAINING IV
              </span>
              <br />
              To summarize, in order to maximize your reward you should:
              <br /> <br />
              Make the slider narrow when you are certain about your answer to
              reach the maximum height of the bar.
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_correctcert}
                  alt="bar"
                />
              </span>
              Make the slider wider when you are uncertain to cover a number of
              values.
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_sliderwrongunc}
                  alt="bar"
                />
              </span>
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 10) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING IV</span>
              <br />
              <br />
              So your task is it to use the slider optimally to maximise your
              reward and master the three challenges:
              <br />
              <br />
              <strong>(1)</strong> Find out which instrument is important and{" "}
              <br />
              <strong>(2)</strong> How it is associated with the population
              size.
              <br /> <strong>(3)</strong> Spot and react to changes in (1) and
              (2). <br />
              <br />
              Again, the true population size shown after each planet will make
              it possible for you to learn and master the challenges.
              <br />
              <br />
              Click the [<strong>SPACEBAR</strong>] once you have seen the
              instruments or feedback for long enough.
              <br />
              Otherwise they will disappear after a couple of seconds.
              <br /> <br />
              Press the [<strong>SPACEBAR</strong>] to start the final training.
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

export default withRouter(TrainingIntroC);
