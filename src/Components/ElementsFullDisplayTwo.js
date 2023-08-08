import React from "react";
import styles from "./style/taskStyle.module.css";
import { View } from "react-native-web";
import ElementBar from "./ElementBar";
import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
// import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
import "./style/barstyles.css";
//

class ElementsFullDisplayTwo extends React.Component {
  constructor(props) {
    super(props);
    /* data to be saved .*/

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



    this.state = {
      img1: Cover,
      img2: Cover,
      show1: null,
      show2: null,
      shownImg1: img1,
      shownImg2: img2,
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }


  mouseOver(elNr) {
    if (elNr === 1) {
    this.setState({
        img1: this.state.shownImg1,
        show1: 1,
      });
    } else if (elNr === 2) {
    this.setState({
        img2: this.state.shownImg2,
        show2: 1,
      });
    }
  }

  mouseOut(elNr) {
    if (elNr === 1) {
    this.setState({
        img1: Cover,
        show1: null,
        style1: styles.elementsize,

      });
    } else if (elNr === 2) {

      this.setState({
        img2: Cover,
        show2: null,
        style2: styles.elementsize,
      });
    }
  }


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
            className={styles.elementsize}
            src={this.state.img1}
            alt="element1"
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
            className={styles.elementsize}
            src={this.state.img2}
            alt="element2"
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
    </div>
  </div>

    );
  }
}

export default ElementsFullDisplayTwo;
