import React from "react";
import styles from "./style/taskStyle.module.css";
import { View } from "react-native-web";
import ElementBar from "./ElementBar";
import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
import "./style/barstyles.css";
//

class ElementsFullDisplayTraining extends React.Component {
  constructor(props) {
    super(props);
    /* data to be saved .*/
    var times_element1 = Array(1)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element2 = Array(1)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element3 = Array(1)
      .fill()
      .map(() => Array(3).fill(0));

    if (this.props.corr_elem === 1) {
      var style1_tmp = styles.relevInd_game;
      var style2_tmp = styles.elementsize;
      var style3_tmp = styles.elementsize;
    } else if (this.props.corr_elem === 2) {
      var style1_tmp = styles.elementsize;
      var style2_tmp = styles.relevInd_game;
      var style3_tmp = styles.elementsize;
    } else if (this.props.corr_elem === 3) {
      var style1_tmp = styles.elementsize;
      var style2_tmp = styles.elementsize;
      var style3_tmp = styles.relevInd_game;
    }

    if (this.props.img1 === 1) {
      var img1 = Blue;
      if (this.props.img2 === 2) {
        var img2 = Red;
        var img3 = Yellow;
      } else if (this.props.img2 === 3) {
        var img2 = Yellow;
        var img3 = Red;
      }
    } else if (this.props.img1 === 2) {
      var img1 = Red;

      if (this.props.img2 === 3) {
        var img2 = Yellow;
        var img3 = Blue;
      } else if (this.props.img2 === 1) {
        var img2 = Blue;
        var img3 = Yellow;
      }
    } else if (this.props.img1 === 3) {
      var img1 = Yellow;

      if (this.props.img2 === 1) {
        var img2 = Blue;
        var img3 = Red;
      } else if (this.props.img2 === 2) {
        var img2 = Red;
        var img3 = Blue;
      }
    }

    this.state = {
      img1: Cover,
      img2: Cover,
      img3: Cover,
      show1: null,
      show2: null,
      show3: null,
      shownImg1: img1,
      shownImg3: img2,
      shownImg2: img3,
      style1: styles.elementsize,
      style2: styles.elementsize,
      style3: styles.elementsize,
      times_element1: times_element1,
      times_element2: times_element2,
      times_element3: times_element3,
      style_element1: style1_tmp,
      style_element2: style2_tmp,
      style_element3: style3_tmp,
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

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

  mouseOver(elNr) {
    if (elNr === 1) {
      this.state.times_element1.push([Math.round(performance.now()), 0, 0]);
      this.setState({
        img1: Blue,
        show1: 1,
        style1: this.state.style_element1,
      });
    } else if (elNr === 2) {
      this.state.times_element2.push([Math.round(performance.now()), 0, 0]);
      this.setState({
        img2: Red,
        show2: 1,
        style2: this.state.style_element2,
      });
    } else if (elNr === 3) {
      this.state.times_element3.push([Math.round(performance.now()), 0, 0]);
      this.setState({
        img3: Yellow,
        show3: 1,
        style3: this.state.style_element3,
      });
    }
  }

  mouseOut(elNr) {
    if (elNr === 1) {
      var times_element1 = this.state.times_element1;

      times_element1[times_element1.length - 1][1] = Math.round(
        performance.now()
      );
      times_element1[times_element1.length - 1][2] =
        times_element1[times_element1.length - 1][1] -
        times_element1[times_element1.length - 1][0];
      this.setState({
        img1: Cover,
        show1: null,
        style1: styles.elementsize,
        times_element1: times_element1,
      });
    } else if (elNr === 2) {
      var times_element2 = this.state.times_element2;

      times_element2[times_element2.length - 1][1] = Math.round(
        performance.now()
      );
      times_element2[times_element2.length - 1][2] =
        times_element2[times_element2.length - 1][1] -
        times_element2[times_element2.length - 1][0];
      this.setState({
        img2: Cover,
        show2: null,
        style2: styles.elementsize,
        times_element2: times_element2,
      });
    } else if (elNr === 3) {
      var times_element3 = this.state.times_element3;
      times_element3[times_element3.length - 1][1] = Math.round(
        performance.now()
      );
      times_element3[times_element3.length - 1][2] =
        times_element3[times_element3.length - 1][1] -
        times_element3[times_element3.length - 1][0];
      this.setState({
        img3: Cover,
        show3: null,
        style3: styles.elementsize,
        times_element3: times_element3,
      });
    }
  }

  componentDidMount() {
    this.timerkeyHandle = setTimeout(() => {
      document.addEventListener("keydown", this.handleKeyDown);
      this.timerkeyHandle = 0;
    }, 1000);

    this.timerHandle = setTimeout(() => {
      this.props.onViewEnd(
        this.state.times_element1,
        this.state.times_element2,
        this.state.times_element3
      );
      this.timerHandle = 0;
    }, 10000);
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
      this.props.onViewEnd(
        this.state.times_element1,
        this.state.times_element2,
        this.state.times_element3
      );
    }
  };

  render() {
    let text = (
      <div className={styles.main}>
        <p>
          <br />
          Click the [<strong>SPACEBAR</strong>] if you have seen the elements long enough.
          <br /> <br />
        </p>
      </div>
    );
    return (
      <div className={styles.cockpit}>
      <div className={styles.textblock}>{text}</div>
        <div className={styles.main}>
          <View style={styles.container}>
            <img
              className={this.state.style1}
              src={this.state.img1}
              alt="trainelement1"
              onMouseOver={(elNr) => this.mouseOver(1)}
              onMouseOut={(elNr) => this.mouseOut(1)}
            />
            {this.state.show1 ? (
              <div className={styles.overlay}>
                <ElementBar progress={this.props.value1} />
              </div>
            ) : null}
            {this.state.show1 ? (
              <div className={styles.overlaytext}>{this.props.value1}%</div>
            ) : null}
          </View>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <View style={styles.container}>
            <img
              className={this.state.style2}
              src={this.state.img2}
              alt="trainelement2"
              onMouseOver={(elNr) => this.mouseOver(2)}
              onMouseOut={(elNr) => this.mouseOut(2)}
            />
            {this.state.show2 ? (
              <div className={styles.overlay}>
                <ElementBar progress={this.props.value2} />
              </div>
            ) : null}
            {this.state.show2 ? (
              <div className={styles.overlaytext}>{this.props.value2}%</div>
            ) : null}
          </View>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <View style={styles.container}>
            <img
              className={this.state.style3}
              src={this.state.img3}
              alt="trainelement3"
              onMouseOver={(elNr) => this.mouseOver(3)}
              onMouseOut={(elNr) => this.mouseOut(3)}
            />
            {this.state.show3 ? (
              <div className={styles.overlay}>
                <ElementBar progress={this.props.value3} />
              </div>
            ) : null}
            {this.state.show3 ? (
              <div className={styles.overlaytext}>{this.props.value3}%</div>
            ) : null}
          </View>
        </div>
      </div>


    );
  }
}

export default ElementsFullDisplayTraining;
