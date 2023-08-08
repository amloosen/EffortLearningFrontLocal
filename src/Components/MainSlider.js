import { range } from "lodash";
import normalPdf from "normal-pdf";
import styles from "./style/taskStyle.module.css";
import React from "react";
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
      spaceButton: false,
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
          color: "#d2eaf2",
          tickAmount: 20,
          tickPlacement: "on",
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
            offsetY: 8,
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
            },
          },
        },
        events: [],
        grid: { show: false },
        tooltips: { enabled: false },
        hover: { mode: null },
        responsive: [
          {
            breakpoint: 100,
          },
        ],
      },
    };
  }
  ////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this._isMounted = true;
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);
      this.setTimer();
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    this.clearTimer();
  }

  setTimer = () => {
    this.timerHandle = setTimeout(() => {
      this.setState({ spaceButton: true });
      this.timerHandle = 0;
    },1000);
  };

  clearTimer = () => {
    if (this.timerHandle) {
        clearTimeout(this.timerHandle);
        this.timerHandle = 0;
    }
  };

  handleKeyDown = (event) => {
    if (this._isMounted = true) {
      this.setState((prevState) => ({
        timesKeyDown: prevState.timesKeyDown + 1,
      }));
      var mu = this.state.mu;
      var sgm = this.state.sgm;
      var distHeight = this.state.distHeight;
      switch (event.keyCode) {
        case 32:
          if (this.props.training === 1 && this._isMounted) {
            this.resetSlider(50, 50);
          }
          if (this._isMounted && this.state.spaceButton){
          let choiceTime0 = Math.round(performance.now());
          this.props.onSpacebarHit({ mu, sgm }, distHeight, choiceTime0);
        }
          break;
        case 40:
          this.setState((prevState) => ({
            sgm: prevState.sgm + this.stepsSgm(prevState.timesKeyDown),
          }));
          this.setValue(this.state.mu, this.state.sgm);
          break;
        case 38:
          this.setState((prevState) => ({
            sgm: prevState.sgm - this.stepsSgm(prevState.timesKeyDown),
          }));
          this.setValue(this.state.mu, this.state.sgm);
          break;
        case 39:
          this.setState((prevState) => ({
            mu: prevState.mu + this.stepsMu(prevState.timesKeyDown),
          }));
          this.setValue(this.state.mu, this.state.sgm);
          break;
        case 37:
          this.setState((prevState) => ({
            mu: prevState.mu - this.stepsMu(prevState.timesKeyDown),
          }));
          this.setValue(this.state.mu, this.state.sgm);
          break;
        default:
      }
    }
  };

  handleKeyUp = () => {
    this.setState({ timesKeyDown: 0 });
  };

  stepsSgm = (pressed) => {
    if (pressed < 10) {
      return 5;
    }
    else if (pressed >= 10 && pressed < 30) {
      return 20;
    } else if (pressed >= 20 && pressed < 30) {
      return 30;
  } else if (pressed >= 30 && pressed < 50) {
      return 40;
    } else if (pressed >= 40 && pressed < 50) {
      return 50;
  } else if (pressed >= 50 && pressed < 70) {
      return 60;
    } else if (pressed >= 60 && pressed < 70) {
      return 70;
  } else if (pressed >= 70 && pressed < 90) {
      return 80;
    }
    else if (pressed >= 80 && pressed < 90) {
      return 90;
  }
    else if (pressed >= 90 && pressed < 100) {
      return 100;
    } else {
      return 110;
    }
  };

  stepsMu = (pressed) => {
    if (pressed < 10) {
      return 1;
    } else if (pressed >= 10) {
      return 5;
    } else if (pressed >= 20) {
      return 10;
    } else if (pressed >= 30) {
      return 15;
    } else if (pressed >= 40) {
      return 20;
    }
  };

  resetSlider = (mu, sgm) => {
    if (this._isMounted){
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
    });
  }
  };

  setValue = (mu, sgm) => {
    if (mu > 100) {
      mu = 100;
    }
    if (mu < 0) {
      mu = 0;
    }

    if (sgm < 1) {
      sgm = 1;
    }
    if (sgm > 700) {
      sgm = 700;
    }

    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) => normalPdf(x, mu, sgm));
    const yValuesAdapt_tmp = yValues.map(function (element) {
      return element * 1000;
    });

    if (Math.max.apply(null, yValuesAdapt_tmp) >= 100) {
      var distheight_tmp = 500;
    } else {
      var distheight_tmp = Math.max.apply(null, yValuesAdapt_tmp) * 5;
    }
    this.setState({
      series: [{ data: yValuesAdapt_tmp }],
      sgm: sgm,
      mu: mu,
      distHeight: distheight_tmp,
    });
  };

  render() {
    return (
      <div className={styles.main}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={this.state.distHeight}
          width="1000%"
          align="center"
        />
      </div>
    );
  }
}
export default Slider;
