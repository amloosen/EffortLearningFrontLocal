import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import Slider from "./MainSlider";
import { StyleSheet, View } from "react-native-web";

class DisplaySliderTrainer extends React.Component {
  constructor(props) {
    super(props);
  }

  logData = (result, time) => {
    let trialSgmMu = this.props.trialSgmMu;
    let trialRT = this.props.trialRT;
    let practNum = this.props.practNum;
    trialSgmMu[practNum - 1][1] = result.sgm;
    trialSgmMu[practNum - 1][2] = result.mu;
    trialSgmMu[practNum - 1][0] = practNum;
    trialRT[practNum - 1][0] = practNum;
    trialRT[practNum - 1][1] = time;
    trialRT[practNum - 1][2] = Math.round(performance.now());
    trialRT[practNum - 1][3] = trialRT[practNum - 1][2] - time;
    this.props.onSliderEnd(trialSgmMu, trialRT);
  };

  render() {
    if (this.props.practNum === 1) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 65 with high certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 2) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 65 with low certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 3) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 25 with high certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 4) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 25 with low certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 5) {
      var text = (
        <div className={styles.questions}>
          <br />
          What is your age ? <br />
          Remember to also indicate your certainty in your answer.
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 6) {
      var text = (
        <div className={styles.questions}>
          What is the population of Spain?
          <br />
          (the scale refers to 0 - 100 Million). <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 7) {
      var text = (
        <div className={styles.questions}>
          What is the population of New York City? <br />
          (the scale refers to 0 - 100 Million) <br />
          <br />
        </div>
      );
    }

    return (
      <div className={styles.cockpitslider}>
        <View style={stylesSliderRep.header}>
          <span className={styles.slidertextintro}>
            <div>{text}</div>
          </span>
        </View>
        <span className={styles.slider}>
          <Slider
            mu={this.props.startMu}
            sgm={this.props.startSgm}
            onSpacebarHit={this.logData}
            training={1}
          />
        </span>
      </div>
    );
  }
}

export default withRouter(DisplaySliderTrainer);

const stylesSliderRep = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    position: "absolute",
  },
});
