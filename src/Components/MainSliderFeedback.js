import { range } from "lodash";
import normalPdf from "normal-pdf";
import styles from "./style/taskStyle.module.css";
import React from "react";
import { StyleSheet, View, Text } from "react-native-web";
import ReactApexChart from "react-apexcharts";

class Slider extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) =>
      normalPdf(x, this.props.mu, this.props.sgm)
    );
    const yValuesAdapt = yValues.map(function (element) {
      return element * 1000;
    });
    var distheight_tmp = Math.max.apply(null, yValuesAdapt) * 5;

    this.state = {
      text: "How large is the alien population?",
      disp_feedback: 0,
      timesKeyDown: 0,
      mu: this.props.mu,
      sgm: this.props.sgm,
      distHeight: distheight_tmp,
      series: [{ data: yValuesAdapt }],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        colors: ["#d2eaf2"],
        fill: { colors: ["#d2eaf2"] },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        yaxis: {
          type: "numeric",
          min: 0,
          labels: { show: false },
          axisTicks: {
            show: false,
          },
          lines: {
            show: false,
          },
        },
        xaxis: {
          type: "numeric",
          color: "#d2eaf2",
          tickAmount: 20,
          overwriteCategories: [
            "0",
            "5",
            "10",
            "15",
            "20",
            "25",
            "30",
            "35",
            "40",
            "45",
            "50",
            "55",
            "60",
            "65",
            "70",
            "75",
            "80",
            "85",
            "90",
            "95",
            "100",
          ],
          lines: {
            show: false,
          },
          axisTicks: {
            color: "#e7e6e2",
            width: 3,
            height: 10,
          },
          axisBorder: {
            show: true,
            color: "#e7e6e2",
            height: 4,
            width: "100%",
          },
          labels: {
            rotate: 0,
            style: {
              fontSize: "2.5vh",
              colors: [
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
              ],
              offsetX: 0,
              offsetY: 0,
            },
          },
        },

        grid: { show: false },
        tooltip: { enabled: false },
        annotations: [
          {
            shapes: [
              {
                type: "line",
              },
            ],
          },
        ],
      },
    };
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
  ////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this._isMounted = true;
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    this.resetSlider(50, 30);
  }

  componentDidUpdate() {
    if (this.state.disp_feedback === 1) {
      var mu = this.state.mu;
      var sgm = this.state.sgm;
      let choiceTime0 = Math.round(performance.now());
      this.timerHandle = setTimeout(() => {
        this.props.onSpacebarHit({ mu, sgm }, this.state.height, choiceTime0);
      }, 5000);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.timerHandle);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = () => {
    this.setState({ timesKeyDown: 0 });
  };

  handleKeyDown = (event) => {
    this.setState((prevState) => ({
      timesKeyDown: prevState.timesKeyDown + 1,
    }));

    switch (event.keyCode) {
      case 32:
        this.showFeedback();
        if (this._isMounted) {
          this.resetSlider(50, 50);
        }

        break;
      case 40:
        this.setState((prevState) => ({
          sgm: prevState.sgm + this.stepsSgm(prevState.timesKeyDown),
        }));
        this.setValue(this.state.mu, this.state.sgm);
        break;
      case 38:
        if (this.state.sgm <= 13) {
          return null;
        } else {
          if (this.state.sgm >= 16) {
            this.setState((prevState) => ({
              sgm: prevState.sgm - this.stepsSgm(prevState.timesKeyDown),
            }));

            this.setValue(this.state.mu, this.state.sgm);
          }
        }
        break;
      case 39:
        if (this.state.mu === 100) {
          var mu_tmp = this.state.mu;
          this.setValue(mu_tmp, this.state.sgm);
        } else {
          this.setState((prevState) => ({
            mu: prevState.mu + this.stepsMu(prevState.timesKeyDown),
          }));
          this.setValue(this.state.mu, this.state.sgm);
        }
        break;
      case 37:
        if (this.state.mu === 0) {
          var mu_tmp = this.state.mu;
          this.setValue(mu_tmp, this.state.sgm);
        } else {
          this.setState((prevState) => ({
            mu: prevState.mu - this.stepsMu(prevState.timesKeyDown),
          }));
          this.setValue(this.state.mu, this.state.sgm);
        }
        break;
      default:
    }
  };

  stepsSgm = (pressed) => {
    if (pressed < 10 || this.state.sgm <= 29) {
      return 1;
    } else if (pressed >= 10 && pressed < 30) {
      return 10;
    } else if (pressed >= 30 && pressed < 60) {
      return 30;
    } else if (pressed >= 60 && pressed < 100) {
      return 40;
    } else if (pressed >= 100) {
      return 50;
    }
  };

  stepsMu = (pressed) => {
    if (pressed < 10) {
      return 1;
    } else if (pressed >= 10) {
      return 2;
    }
  };

  resetSlider = (mu, sgm) => {
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) =>
      normalPdf(x, this.props.mu, this.props.sgm)
    );
    const yValuesAdapt_tmp = yValues.map(function (element) {
      return element * 1000;
    });
    var distheight_tmp = Math.max.apply(null, yValuesAdapt_tmp) * 5;

    this.setState({
      series: [{ data: yValuesAdapt_tmp }],
      sgm: sgm,
      mu: mu,
      distHeight: distheight_tmp,
      height: 0,
    });
  };

  setValue = (mu, sgm) => {
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) => normalPdf(x, mu, sgm));
    const yValuesAdapt_tmp = yValues.map(function (element) {
      return element * 1000;
    });

    var distheight_tmp = Math.max.apply(null, yValuesAdapt_tmp) * 5;

    this.setState({
      series: [{ data: yValuesAdapt_tmp }],
      sgm: sgm,
      mu: mu,
      distHeight: distheight_tmp,
    });
  };

  showFeedback = () => {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    //
    let text2 = (
      <div className={styles.questions}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "bold",
          }}
        >
          <Text>The true population on the planet was</Text>
          <Text style={{ color: "#b3e49d", fontSize: 35 }}>
            {" "}
            {this.props.trueValue}
          </Text>
          <Text> million.</Text>
        </Text>
      </div>
    );

    var height_tmp = this.state.series[0].data[this.props.trueValue * 2];
    var annot = this.props.trueValue * 2;
    var offset_tmp = this.state.distHeight - height_tmp; //350.42576063353897=250;362.46985844228993,290
    var offset = 200;
    this.setState({
      text: text2,
      disp_feedback: 1,
      options: {
        // points: [
        //   {
        //     x: annot,
        //     y: -0,
        //     marker: {
        //       shape: "circle",
        //       size: 10,
        //       fillColor: "#1C00ff00",
        //       strokeColor: "#b3e49d",
        //       radius: 4,
        //       cssClass: "apexcharts-custom-class",
        //     },
        //   },
        // ],
      },
    });
  };

  render() {
    return (
      // <div className={styles.cockpitslider}>
      //   <View style={stylesSliderRep.header}>
      //     <span className={styles.slidertext}>
      //       <div className={styles.questions}>{this.state.text}</div>
      //     </span>
      //   </View>
      // <span className={styles.questions}>
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height={this.state.distHeight}
        width="800px"
        align="center"
      />
      //   </span>
      // </div>
    );
  }
}
export default Slider;

const stylesSliderRep = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    position: "absolute",
  },
});
