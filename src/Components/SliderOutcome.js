import React from "react";
import { withRouter } from "react-router-dom";
import { range } from "lodash";
import normalPdf from "normal-pdf";
import ReactApexChart from "react-apexcharts";
import styles from "./style/taskStyle.module.css";

class OutcomeSlider extends React.Component {
  constructor(props) {
    super(props);

    const xValues = range(0, 100, 0.5);
    const yValues = xValues.map((x) => normalPdf(x, props.mu, props.sgm));
    const yValuesAdapt = yValues.map(function (element) {
      return element * 1000;
    });

    this.state = {
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
          color: "#1C00ff00",
          show: false,
          tickAmount: 5,
          overwriteCategories: ["0", "25", "50", "75", "100"],
          lines: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
            color: "#1C00ff00",
            opacity: 1,
            height: 4,
            width: "100%",
          },
          labels: {
            rotate: 0,
            style: {
              fontSize: "2.5vh",
              colors: [
                "#1C00ff00",
                "#1C00ff00",
                "#1C00ff00",
                "#1C00ff00",
                "#1C00ff00",
              ],
              offsetX: 0,
              offsetY: 0,
            },
          },
        },
        grid: { show: false },
        tooltip: { enabled: false },
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

  render() {
    return (
      <div className={styles.main}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={this.props.height}
          width="1000%"
          align="center"
        />
        </div>
    );
  }
}
export default withRouter(OutcomeSlider);
