import React from "react";
import { withRouter } from "react-router-dom";
import ElementsOneDisplay from "./ElementsOneDisplay";

class DisplayTrainElement extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timerkeyHandle = setTimeout(() => {
     document.addEventListener("keydown", this.handleKeyDown);
     this.timerkeyHandle = 0;
   }, 1000);
   this.timerHandle= setTimeout(() => {
       this.props.handleElement(1);
         this.timerHandle = 0;
     }, 1800);

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


  render() {
    return (
      <ElementsOneDisplay
        value={this.props.valTrainElem}
        traintrialTotal={this.props.traintrialTotal}
        traintrialNum={this.props.traintrialNum}
        blue={this.props.blue}
      />
    );
  }

}
export default withRouter(DisplayTrainElement);
