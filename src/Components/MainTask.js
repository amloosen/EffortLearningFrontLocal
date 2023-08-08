import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../config";
import DisplaySlider from "./DisplaySlider";
import DisplayElements from "./DisplayElements";
import DisplayFeedback from "./DisplayFeedback";
import DisplayBreak from "./DisplayBreak";
import { range } from "lodash";

////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getBonus(bonisum, currTrialNum) {
  var bonus = (bonisum / (89 * currTrialNum)) * 5; // adapt the *1 later for patient study
  if (bonus < 0) {
    bonus = 0;
  } else if (bonus > 5) {
    bonus = 5;
  } else {
    bonus = roundTo(bonus, 2); //2 dec pl
  }
  return bonus;
}

function roundTo(n, digits) {
  if (digits === undefined) {
    digits = 0;
  }

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  var test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
}
/////////////////////////////////////////////////////////////////////////////////
class MainTask extends React.Component {
  constructor(props) {
    super(props);

    var randNum = "struct_" + getRandomInt(1, 10);
    var StructToRender = require("./taskStructs/" + randNum + ".json");
    var precededShift = StructToRender[0]; //1=intra-dimensional; 2=extra-dimensional
    var w0 = StructToRender[1];
    var relevant_w = StructToRender[2];
    var corPos_sq = StructToRender[3];
    var val_corr_elem = StructToRender[4];
    var epsilon = StructToRender[5];
    var true_pop_size_tmp = StructToRender[6];
    var true_pop_size = true_pop_size_tmp.map(function (each_element) {
      return Number(each_element.toFixed(0));
    });
    var check_al1 = StructToRender[7];
    var check_al2 = StructToRender[8];

    var nr_trial = w0.length; //debugger

    //pregenerate the values of the remaining elements

    var all_element_values = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));

    for (var j = 0; j <= nr_trial - 1; j++) {
      all_element_values[j][corPos_sq[j] - 1] = val_corr_elem[j];
      if (corPos_sq[j] === 1) {
        all_element_values[j][1] = check_al1[j];
        all_element_values[j][2] = check_al2[j];
      } else if (corPos_sq[j] === 2) {
        all_element_values[j][0] = check_al1[j];
        all_element_values[j][2] = check_al2[j];
      } else if (corPos_sq[j] === 3) {
        all_element_values[j][0] = check_al1[j];
        all_element_values[j][1] = check_al2[j];
      }
    }

    let trialSgmMu = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    let trialRT = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    let indicKey_tmp = Array(nr_trial)
      .fill()
      .map(() => Array(2).fill(0));

    let indicReq_tmp = Array(nr_trial).fill(0);
    var ind_indic = [4, 24, 38, 58, 72, 92, 106, 126, 140, 154];

    for (var k = 4; k <= nr_trial - 1; k++) {
      if (ind_indic.indexOf(k) > -1) {
        indicReq_tmp[k] = 1;
      }
    }

    var blockTotal_tmp = 5;
    var trialPerBlock = nr_trial / blockTotal_tmp;

    for (var l = 1; l <= nr_trial - 1; l += trialPerBlock) {
      indicReq_tmp[l] = 0; //make sure the element indicator is never on the last trial of a block to not prevent sending the data
    }

    var times_element1 = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element2 = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element3 = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));

    var outcomeHeight_tmp = Array(nr_trial).fill(0);

    var bonusPerBlock_tmp = Array(blockTotal_tmp).fill(0);

    var element_colours = [1, 2, 3];
    shuffle(element_colours);

    var currentDate = new Date();
    var mainStartTime = currentDate.toString();

    var sgmPrompt_tmp = Array(nr_trial).fill(0);

    this.state = {
      // userID: this.props.location.state.userID,
      // date: this.props.location.state.date,
      // startTime: this.props.location.state.startTime, //debugger
      userID: 12,
      date: 12,
      startTime: 12, //debugger

      sectionStartTime: mainStartTime,
      taskSession: "MainTask",
      trialTotal: nr_trial, //debugger
      trialPerBlock: trialPerBlock,
      trialNum: 1,
      showBreak: 0,
      trialBlockNum: 1,
      blockTotal: blockTotal_tmp,
      blockNum: 1,
      indicReq: indicReq_tmp,
      indicKey: indicKey_tmp,
      trialRT: trialRT,
      bonusPerBlock: bonusPerBlock_tmp,
      choiceTime0: 0,
      element1Col: element_colours[0],
      element2Col: element_colours[1],
      element3Col: element_colours[2],
      times_element1: times_element1,
      times_element2: times_element2,
      times_element3: times_element3,
      trialSgmMu: trialSgmMu,
      outcomeHeight: outcomeHeight_tmp,
      break: 0,
      all_true_pop_size: true_pop_size,
      all_element_values: all_element_values,
      disp_el: 1,
      disp_slider: 0,
      startMu: 50,
      startSgm: 50,
      study_part: 5,
      alert_count: 0,
      //task data
      corPos_sq: corPos_sq,
      w0: w0,
      relevant_w: relevant_w,
      val_corr_elem: val_corr_elem,
      epsilon: epsilon,
      precededShift: precededShift,
      epsilon: epsilon,
      sgmPrompt: sgmPrompt_tmp,
    };

    //* prevents page from going to the right/left when arrows are pressed .*/
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
  /////////////////////////////////////////////////////////////////////////////////
  sendBlock(height) {
    // var start = ((this.state.blockNum - 1) * this.state.trialPerBlock)+ 1;
    var start = this.state.trialNum - this.state.trialPerBlock;

    //
    height = height.filter(function (element) {
      return element !== undefined;
    });

    var bonisum = height.reduce((result, number) => result + number);
    var bonus = getBonus(bonisum, this.state.trialNum);

    var bonusPerBlock_tmp = this.state.bonusPerBlock;
    bonusPerBlock_tmp[this.state.blockNum - 1] = bonus;
    ///
    var height_tmp = height.slice(start, this.state.trialNum);
    var times1_tmp = this.state.times_element1.slice(
      start,
      this.state.trialNum
    );
    var times2_tmp = this.state.times_element2.slice(
      start,
      this.state.trialNum
    );
    var times3_tmp = this.state.times_element3.slice(
      start,
      this.state.trialNum
    );
    var trialSgmMu_tmp = this.state.trialSgmMu.slice(
      start,
      this.state.trialNum
    );

    var indicKey_tmp = this.state.indicKey.slice(start, this.state.trialNum);
    var trialRT_tmp = this.state.trialRT.slice(start, this.state.trialNum);

    var currentDate = new Date();
    var blockFinishTime = currentDate.toTimeString();

    let body = {
      sectionStartTime: this.state.sectionStartTime,
      startTime: this.state.startTime,
      blockFinishTime: blockFinishTime,
      all_element_values: this.state.all_element_values,
      trialTotal: this.state.trialTotal,
      corr_elements: this.state.corPos_sq,
      trialSgmMu: trialSgmMu_tmp,
      times_element1: times1_tmp,
      times_element2: times2_tmp,
      times_element3: times3_tmp,
      element1Col: this.state.element1Col,
      element2Col: this.state.element2Col,
      element3Col: this.state.element3Col,
      startSgm: this.state.startSgm,
      startMu: this.state.startMu,
      all_true_pop_size: this.state.all_true_pop_size,
      indicKey: indicKey_tmp,
      outcomeHeight: height_tmp,
      trialRT: trialRT_tmp,
      blockTotal: this.state.blockTotal,
      indicReq: this.state.indicReq,
      trialPerBlock: this.state.trialPerBlock,
      blockNum: this.state.blockNum,
      bonusPerBlock: bonusPerBlock_tmp,
      sgmPrompt: this.state.sgmPrompt,
    };

    fetch(
      `${API_URL}/main_task/create/` +
        this.state.userID +
        `/` +
        this.state.study_part,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (this.state.blockNum === 1) {
      let taskstruct = {
        corPos_sq: this.state.corPos_sq,
        w0: this.state.w0,
        relevant_w: this.state.relevant_w,
        val_corr_elem: this.state.val_corr_elem,
        epsilon: this.state.epsilon,
        precededShift: this.state.precededShift,
        true_pop_size: this.state.all_true_pop_size,
      };
      fetch(
        `${API_URL}/task_params/create/` +
          this.state.userID +
          `/` +
          this.state.study_part,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskstruct),
        }
      );
    }
    if (this.state.blockNum >= this.state.blockTotal) {
      var height_check = this.state.height;
      height_check = height_check.filter(function (element) {
        return element !== undefined;
      });
      ///
      var bonisum = height_check.reduce((result, number) => result + number);
      var bonus = getBonus(bonisum,this.state.trialNum);

      let backup = {
        times_element1_backup: this.state.times_element1,
        times_element2_backup: this.state.times_element2,
        times_element3_backup: this.state.times_element3,
        trialSgmMu_backup: this.state.trialSgmMu,
        indicKey_backup: this.state.indicKey,
        trialRT_backup: this.state.trialRT,
        bonus: bonus,
      };
      fetch(
        `${API_URL}/data_backup/create/` +
          this.state.userID +
          `/` +
          this.state.study_part,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backup),
        }
      );

      this.redirectToNextStage(bonus);
    } else {
      this.setState({
        showBreak: 1,
        disp_el: 0,
        disp_feedback: 0,
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  render() {
    if (this.state.disp_el === 1) {
      return (
        <DisplayElements
          element1Col={this.state.element1Col}
          element2Col={this.state.element2Col}
          element3Col={this.state.element3Col}
          all_element_values={this.state.all_element_values}
          indicReq={this.state.indicReq}
          trialNum={this.state.trialNum}
          trialBlockNum={this.state.trialBlockNum}
          trialPerBlock={this.state.trialPerBlock}
          onElementsEnd={this.handleElementsData}
          onElementsIndic={this.handleIndicData}
        />
      );
    }

    if (this.state.disp_slider === 1) {
      return (
        <DisplaySlider
          trialSgmMu={this.state.trialSgmMu}
          trialRT={this.state.trialRT}
          trialNum={this.state.trialNum}
          onSliderEnd={this.handleSliderData}
          startSgm={this.state.startSgm}
          startMu={this.state.startMu}
        />
      );
    }

    if (this.state.disp_feedback === 1) {
      return (
        <DisplayFeedback
          element1Col={this.state.element1Col}
          element2Col={this.state.element2Col}
          element3Col={this.state.element3Col}
          all_element_values={this.state.all_element_values}
          all_true_pop_size={this.state.all_true_pop_size}
          trialSgmMu={this.state.trialSgmMu}
          distHeight={this.state.distHeight}
          indicReq={this.state.indicReq}
          trialNum={this.state.trialNum}
          onFeedbackEnd={this.handleOutcomeData}
        />
      );
    }
    if (this.state.showBreak === 1) {
      return (
        <DisplayBreak
          blockTotal={this.state.blockTotal}
          blockNum={this.state.blockNum}
          onBreakEnd={this.nextBlock}
        />
      );
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  handleElementsData = (times_element1, times_element2, times_element3) => {
    var times_element1_tmp = this.state.times_element1;
    var times_element2_tmp = this.state.times_element2;
    var times_element3_tmp = this.state.times_element3;
    times_element1_tmp[this.state.trialNum - 1] = times_element1;
    times_element2_tmp[this.state.trialNum - 1] = times_element2;
    times_element3_tmp[this.state.trialNum - 1] = times_element3;
    this.setState({
      times_element1: times_element1_tmp,
      times_element2: times_element2_tmp,
      times_element3: times_element3_tmp,
      disp_el: 0,
      disp_slider: 1,
    });
  };

  handleSliderData = (trialSgmMu, trialRT, distHeight) => {
    this.setState({
      trialSgmMu: trialSgmMu,
      trialRT: trialRT,
      distHeight: distHeight,
      disp_slider: 0,
      disp_feedback: 1,
    });
  };

  handleIndicData = (pressed) => {
    var indicKey_tmp = this.state.indicKey;
    var indicReq_tmp = this.state.indicReq;
    indicReq_tmp[this.state.trialNum - 1] = 0;
    indicKey_tmp[this.state.trialNum - 1][1] = this.state.trialNum;
    indicKey_tmp[this.state.trialNum - 1][2] = pressed;
    this.setState({
      indicKey: indicKey_tmp,
      disp_el: 1,
      indicReq: indicReq_tmp,
    });
  };

  handleOutcomeData = (height) => {
    var outcomeHeight_tmp = this.state.outcomeHeight;
    outcomeHeight_tmp[this.state.trialNum - 1] = height;
    this.nextTrial(outcomeHeight_tmp);
  };

  nextBlock = () => {
    var trialNum_tmp = this.state.trialNum + 1;
    var trialBlockNum_tmp = 1;

    var blockNum_tmp = this.state.blockNum + 1;
    var currentDate = new Date();
    var mainStartTime = currentDate.toString();

    this.setState({
      trialNum: trialNum_tmp,
      trialBlockNum: trialBlockNum_tmp,
      sectionStartTime: mainStartTime,
      disp_feedback: 0,
      disp_el: 1,
      showBreak: 0,
      blockNum: blockNum_tmp,
    });
  };

  nextTrial = (height) => {
    if (
      this.state.trialSgmMu[this.state.trialNum - 1][1] === this.state.startSgm
    ) {
      var alert_count = this.state.alert_count + 1;
    } else {
      var alert_count = this.state.alert_count;
    }

    var sgmPrompt_tmp = this.state.sgmPrompt;
    if (alert_count >= 2) {
      alert(
        "It seems like you are not adapting your certainty. Make sure to indicate your true certainty to maximize your reward!"
      );
      var alert_count = 0;
      sgmPrompt_tmp[this.state.trialNum - 1] = 1;
    }

    var trialNum_tmp = this.state.trialNum + 1;

    if (this.state.trialBlockNum === this.state.trialPerBlock) {
      this.sendBlock(height);
    } else {
      var trialBlockNum_tmp = this.state.trialBlockNum + 1;
      console.log(trialNum_tmp);
      this.setState({
        trialNum: trialNum_tmp,
        trialBlockNum: trialBlockNum_tmp,
        height: height,
        disp_feedback: 0,
        showBreak: 0,
        disp_el: 1,
        alert_count: alert_count,
        sgmPrompt: 0,
      });
    }
  };

  redirectToNextStage(bonus) {
    this.props.history.push({
      pathname: `/EndPage`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
        trialTotal: this.state.trialTotal,
        bonus: bonus,
      },
    });
  }
}

export default withRouter(MainTask);
