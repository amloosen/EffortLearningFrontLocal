import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";

class DisplayTrainFeedback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timerHandle = setTimeout(() => {
      this.props.handleFeedback(1);
    },1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timerHandle);
  }

  componentDidMount() {
    this.timerkeyHandle = setTimeout(() => {
      document.addEventListener("keydown", this.handleKeyDown);
      this.timerkeyHandle = 0;
    }, 500);

    this.timerHandle = setTimeout(() => {
      this.props.handleFeedback(1);
      this.timerHandle = 0;
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerkeyHandle) {
      // Yes, clear it
      clearTimeout(this.timerkeyHandle);
      this.timerkeyHandle = 0;
    }
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      this.props.handleFeedback(1);
    }
  };

  render() {
    let text2 = (
      <div className={styles.questions}>
        The true population on the planet was {this.props.corr_value} million.
        <br />
        <br />
        <br />
      </div>
    );


    return (
      <div className={styles.cockpit}>
        <div>{text2}</div>
      </div>
    );
  }

}
export default withRouter(DisplayTrainFeedback);
