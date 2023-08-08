import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import { StyleSheet, View } from "react-native-web";
import Slider from "./MainSlider";
import MainSliderFeedback from "./MainSliderFeedback"
class DisplaySlider extends React.Component {
  constructor(props) {
    super(props);
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

  logData = (result, height,time) => {
    let trialSgmMu = this.props.trialSgmMu;
    let trialRT = this.props.trialRT;
    let trialNum = this.props.trialNum;
    trialSgmMu[trialNum - 1][1] = result.sgm;
    trialSgmMu[trialNum - 1][2] = result.mu;
    trialRT[trialNum - 1][0] = trialNum;
    trialRT[trialNum - 1][1] = time;
    trialRT[trialNum - 1][2] = Math.round(performance.now());
    trialRT[trialNum - 1][3] = trialRT[trialNum - 1][2] - time;

    this.props.onSliderEnd(trialSgmMu, trialRT, height);
  };

  render() {
    return (
            <MainSliderFeedback
              mu={this.props.startMu}
              sgm={this.props.startSgm}
              onSpacebarHit={this.logData}
              trueValue={60}//debugger
            />
    );
  }
}

export default withRouter(DisplaySlider);
