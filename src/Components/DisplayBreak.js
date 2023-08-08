import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";

class DisplayBreak extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timerkeyHandle = setTimeout(() => {
    document.addEventListener("keyup", this.handleBreakKey);
    this.timerkeyHandle = 0;
  }, 2000);

    this.timerHandle = setTimeout(() => {
      this.props.onBreakEnd(1);
      this.timerHandle = 0;
    }, 60000);
  }
  //
  componentWillUnmount() {
    if (this.timerkeyHandle) {
      // Yes, clear it
      clearTimeout(this.timerkeyHandle);
      this.timerkeyHandle = 0;
    }
      clearTimeout(this.timerHandle);
    document.removeEventListener("keyup", this.handleBreakKey);
  }

  handleBreakKey = (e) => {
    if (e.keyCode === 32) {
      this.props.onBreakEnd(1);
    }
  };

  render() {
    let text = (
      <div className={styles.main}>
        <p>
          <span className={styles.center}>BREAK</span>
          <br />
          <br />
          You have completed {this.props.blockNum} out of&nbsp;
          {this.props.blockTotal} blocks!
          <br />
          <br />
          You may take a short break.
          <br />
          <br />
          You should take the opportunity to look away from the screen and <br />
          <br />focus on something in the distance for a few seconds.
          <br />
          Remember to adapt your certainty (width of the slider)! This will maximize your reward.
          <br /><br />
          <span className={styles.centerTwo}>
            If you are ready to continue, please press the [
            <strong>SPACEBAR</strong>].
          </span>
        </p>
      </div>
    );

    return (
      <div className={styles.cockpit}>
        <div className={styles.textblock}>
          {text}
        </div>
      </div>
    );
  }
}
export default withRouter(DisplayBreak);
