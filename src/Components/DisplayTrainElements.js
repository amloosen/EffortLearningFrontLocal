import React from "react";
import { withRouter } from "react-router-dom";
import ElementsFullDisplayTraining from "./ElementsFullDisplayTraining";

class DisplayTrainElements extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTimes = (times_element1, times_element2, times_element3) => {
    this.props.onElementsEnd(times_element1, times_element2, times_element3);
  };


  render() {
      return (
          <ElementsFullDisplayTraining
            value1={this.props.all_element_values[this.props.trialNum - 1][0]}
            value2={this.props.all_element_values[this.props.trialNum - 1][1]}
            value3={this.props.all_element_values[this.props.trialNum - 1][2]}
            img1={this.props.element1Col}
            img2={this.props.element2Col}
            img3={this.props.element3Col}
            corr_elem={this.props.corr_elem}
            trialNum={this.props.trialNum}
            trialTotal={this.props.trialTotal}
            onViewEnd={this.handleTimes}
          />
      );
    }
}
export default withRouter(DisplayTrainElements);
