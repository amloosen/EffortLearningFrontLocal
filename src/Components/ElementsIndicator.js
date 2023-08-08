import React from "react";
import styles from "./style/taskStyle.module.css";
import { View } from "react-native-web";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
// import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";

class ElementsIndicator extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.img1 === 1) {
      var img1 = Blue;
    } else if (this.props.img1 === 2) {
      var img1 = Yellow;
    } else if (this.props.img1 === 3) {
      var img1 = Red;
    }

    if (this.props.img2 === 1) {
      var img2 = Blue;
    } else if (this.props.img2 === 2) {
      var img2 = Yellow;
    } else if (this.props.img2 === 3) {
      var img2 = Red;
    }

    if (this.props.img3 === 1) {
      var img3 = Blue;
    } else if (this.props.img3 === 2) {
      var img3 = Yellow;
    } else if (this.props.img3 === 3) {
      var img3 = Red;
    }

    this.state = {
      img1: img1,
      img2: img2,
      img3: img3,
    };

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  render() {
    let text = (
      <div className={styles.main}>
        <p>
          <br /> <br />
          <br /> <br />
          Please indicate which instrument you think is currently determining
          the population size.
          <br /> <br />
          Do so by pressing the corresponding number key.
        </p>
      </div>
    );

    return (
      <div className={styles.cockpit}>
        <div>{text}</div>
        <span className={styles.centerThreeIndic}>
          <View style={styles.container}>
            <img
              className={styles.elementsize}
              src={this.state.img1}
              alt="indic1"
            />
            <div className={styles.indicatortext}>{1}</div>
          </View>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <View style={styles.container}>
            <img
              className={styles.elementsize}
              src={this.state.img2}
              alt="indic2"
            />
            <div className={styles.indicatortext}>{2}</div>
          </View>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <View style={styles.container}>
            <img
              className={styles.elementsize}
              src={this.state.img3}
              alt="indic3"
            />
            <div className={styles.indicatortext}>{3}</div>
          </View>
        </span>
      </div>
    );
  }
}

export default ElementsIndicator;
