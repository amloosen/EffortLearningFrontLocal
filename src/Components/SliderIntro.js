import React from "react";
import { withRouter } from "react-router-dom";

import styles from "./style/taskStyle.module.css";

import img_spacebar from "./intro/spacebar.jpg";
import img_up from "./intro/up.jpg";
import img_down from "./intro/down.jpg";
import img_left from "./intro/left.jpg";
import img_right from "./intro/right.jpg";
import img_slider1 from "./intro/SliderExamplePicture1.jpg";
import img_slider2 from "./intro/SliderExamplePoint.jpg";
import img_slider3 from "./intro/SliderExampleLine.jpg";
import img_slider4 from "./intro/SliderExamplePicture2.jpg";
import img_slider5 from "./intro/SliderExamplePicture3.jpg";
import img_slider6 from "./intro/SliderExamplePicture4.jpg";
import img_slider7 from "./intro/SliderExamplePicture5.jpg";
/////////////////////////////////////////////////////////////////////////////////
var sliderTraining = [
  img_spacebar,
  img_up,
  img_down,
  img_left,
  img_right,
  img_slider1,
  img_slider2,
  img_slider3,
  img_slider4,
  img_slider5,
  img_slider6,
  img_slider7,
];

class SliderIntro extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES

    this.state = {
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      sectionTime: timeString,
      taskSession: "SliderIntro",
      instructScreenText: 1,
      instructScreen: true,
      pics: sliderTraining,
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
    } else if (whichButton === 5 && curText < 13) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (curText === 13 && whichButton === 10) {
      this.nextPart();
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
  // END COMPONENT PROPS

  nextPart = () => {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/SliderTraining`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    let text;
    if (this.state.instructScreen === true) {
      if (this.state.instructScreenText === 1) {
        document.addEventListener("keyup", this._handleInstructKey);
        text = (
          <div className={styles.main}>
            <p>
              <br />
              <span className={styles.center}>Welcome to our Galactical Game!</span>
              <br />
              We will introduce this online game and all its
              components step by step.
              <br />
              Please make sure to pay full attention. <br />
              <br />
              There will be a quiz after the training session that will ensure
              that you fully understood the game.
              <br />
              <br />
              You will not be able to start the main game if you do not answer
              all questions correctly.
              <br />
              <br />
              Good luck and have fun!
              <br />
              <br />
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              In the following game, you will use a special response slider.
              <br />
              With this slider you can indicate both <br />
              <br />
              <br />
              (1) a <strong>number</strong> you have to indicate and <br />
              (2) how <strong>certain</strong> you are about this number.
              <br />
              <br />
              <br />
              <br />
              We will now show you how this slider works and give you a chance
              to get used to it.
              <br />
              <br />
              <br /> <br />
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              When you make an estimate, such as how expensive something is,{" "}
              <br />
              you might be more or less certain about this estimate's accuracy.
              <br />
              <br />
              This means, sometimes your certainty in this estimate might be
              high (sure) and <br />
              other times your certainty in your estimate might be low (unsure).
              <br />
              <br />
              <br /> <br />
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              For instance a scenario might be:
              <br />
              <br />
              <li>Your estimate:</li>
              “The ice cream will cost £2”
              <br />
              <br />
              <li>Your certainty in your estimate:</li>
              “My certainty that the ice-cream will cost £2 is very high
              <br />
              because this is what I paid last time I went to this shop”
              <br /> <br />
              or <br />
              <br />
              “My certainty about the price of the ice-cream is very low <br />
              because I have never been to this shop before.”
              <br />
              <br />
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              This is the slider you will use to tell us your estimate and your
              certainty in it:
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImg}
                  src={this.state.pics[5]}
                  alt="example1"
                />
              </span>
              <br />
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
              <span className={styles.center}>TRAINING I</span>

              The peak of this curve indicates your estimate:
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={this.state.pics[6]}
                  alt="example1"
                />
              </span>
              And the width of the slider indicates your certainty:
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={this.state.pics[7]}
                  alt="example1"
                />
              </span>
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              You can move the position of the peak
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImg2}
                  src={img_slider2}
                  alt="example1"
                />
              </span>
              <br />
              to the left using the left arrow key
              <img
                className={styles.introImgTwo2}
                src={this.state.pics[3]}
                alt="example1"
              />
              <br />
              and to the right using the right arrow key
              <img
                className={styles.introImgTwo2}
                src={this.state.pics[4]}
                alt="example1"
              />
              <br />
              <br />
              <br />
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              You can change the width as well.
              <br /><br />
              <span className={styles.center}>
                <img
                  className={styles.introImg2}
                  src={this.state.pics[7]}
                  alt="example1"
                />
              </span>
              <br />
              You can make the slider narrower using the up arrow key
              <img
                className={styles.introImgTwo2}
                src={this.state.pics[1]}
                alt="example1"
              />{" "}
              <br /> <br />
              and wider using the down arrow key
              <img
                className={styles.introImgTwo2}
                src={this.state.pics[2]}
                alt="example1"
              />
              <br />  <br />
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              Here you see how it looks like when the estimate is 50
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider1}
                  alt="example1"
                />
              </span>
              and here you see how it looks like when it is 65
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={this.state.pics[8]}
                  alt="example1"
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
              <span className={styles.center}>TRAINING I</span>
              The second aspect of the slider, the changeable width, enables you
              to indicate your certainty.
              <br />
              Here you see how it looks like when the estimate is 50 with{" "}
              <strong>high certainty</strong>
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={this.state.pics[9]}
                  alt="example1"
                />
              </span>
              and here 50 is indicated with <strong> low certainty</strong>
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={this.state.pics[10]}
                  alt="example1"
                />
              </span>
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 11) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              <br />
              To familiarize you with the slider, we will now ask you several
              questions.
              <br />
              <br />
              Some questions are related to yourself and some are not.
              <br />
              <br />
              Please indicate your answer to the question and your certainty in
              your answer using the slider.
              <br />
              <br />
              <br /> <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 12) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              <br />
              One example could be:
              <br />
              <br />
              “How large is the population of Thailand? (If the scale refers to
              0-100 million)”
              <br />
              <br />
              If you think it is approximately 75 million and you are relatively
              certain,your answer could be:
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImg}
                  src={this.state.pics[11]}
                  alt="example1"
                />
              </span>
              <br />
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 13) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              <br />
              When indicating your estimate and certainty, please try to be as
              precise as possible.
              <br />
              <br />
              To submit your answer, please press the space bar.
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo3}
                  src={this.state.pics[0]}
                  alt="example1"
                />
              </span>
              <br /> <br />
              Let's practice this!
              <br /> <br /> <br /> <br />
              Also press the [<strong>SPACEBAR</strong>] to start the practice.
              <br />
              <br />
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

export default withRouter(SliderIntro);
