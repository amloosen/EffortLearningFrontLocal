import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import { StyleSheet, View} from "react-native-web";
import OutcomeSliderBar from "./SliderOutcomeBar";

class DispFeedback extends React.Component {
  constructor(props) {
    super(props);
  }

  handleHeight = (barHeight) => {
    this.props.onFeedbackEnd(barHeight);
  };

  render() {
    let text2;
      text2 = (
        <div className={styles.questions}>
          <p>
            The true population on the planet was{" "}
            <span className={styles.bigger}>
              {this.props.all_true_pop_size[this.props.trialNum - 1]}
            </span>{" "}
            million.<br />
            <span className={styles.main}>
            Click the [<strong>SPACEBAR</strong>] if you have seen the feedback long enough.</span>
          </p>
        </div>
      );

    return (
      <div className={styles.cockpitslider}>
      <View style={stylesSliderRep.header}>
          <span className={styles.slidertext}>
            <div>{text2}</div>
          </span>
        </View>
        <div className={styles.slider}>
          <OutcomeSliderBar
            mu={this.props.trialSgmMu[this.props.trialNum - 1][2]}
            sgm={this.props.trialSgmMu[this.props.trialNum - 1][1]}
            value={this.props.all_true_pop_size[this.props.trialNum - 1]}
            distHeight={this.props.distHeight}
            getBarHeight={this.handleHeight}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(DispFeedback);

const stylesSliderRep = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    position: "absolute",
  },
});
