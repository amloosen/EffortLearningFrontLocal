import React from "react";
import { withRouter } from "react-router-dom";
// import { API_URL } from "../config";
import DisplaySlider from "./DisplaySliderAdapted";
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

function getRand(array) {
  var val_options = range(0, 110, 10);
  var rand = val_options[~~(Math.random() * val_options.length)];
  // var rand = Math.floor(Math.random() * 10);
  if (array.indexOf(rand) === -1) {
    return rand;
  } else {
    return getRand(array);
  }
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
class MainTaskAdapted extends React.Component {
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

    var nr_trial = w0.length; //debugger

    //pregenerate the values of the remaining elements
    var check_al2 = [];
    var check_al1 = [];

    for (var i = 0; i <= nr_trial - 1; i++) {
      var restricted = [val_corr_elem[i], 100 - val_corr_elem[i]];
      if (i < nr_trial / 2) {
        check_al1[i] = getRand(restricted);
        var restrictedsecond = [
          val_corr_elem[i],
          100 - val_corr_elem[i],
          check_al1[i],
        ];
        check_al2[i] = getRand(restrictedsecond);
      } else {
        var restrictedsecond = [
          val_corr_elem[i],
          100 - val_corr_elem[i],
          check_al1[i],
        ];
        check_al2[i] = getRand(restricted);
        check_al1[i] = getRand(restrictedsecond);
      }
    }
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

    for (var k = 9; k <= nr_trial - 1; k += 27) {
      indicReq_tmp[k] = 1;
    }
    var trialPerBlock = nr_trial / 5;

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

    var element_colours = [1, 2, 3];
    shuffle(element_colours);

    var currentDate = new Date();
    var mainStartTime = currentDate.toTimeString();

    this.state = {
      // userID: this.props.location.state.userID,
      // date: this.props.location.state.date,
      // startTime: this.props.location.state.startTime,
      userID:12,
      date:12,
      startTime:12,//debugger
      sectionStartTime: mainStartTime,
      taskSession: "MainTaskAdapted",
      trialTotal: nr_trial, //debugger
      trialPerBlock: trialPerBlock,
      trialNum: 1,
      showBreak: 0,
      trialBlockNum: 1,
      blockTotal: 5,
      blockNum: 1,
      indicReq: indicReq_tmp,
      indicKey: indicKey_tmp,
      trialRT: trialRT,
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
      startSgm: 30,
      study_part: 5,
      //task data
      corPos_sq: corPos_sq,
      w0: w0,
      relevant_w: relevant_w,
      val_corr_elem: val_corr_elem,
      epsilon: epsilon,
      precededShift: precededShift,
      epsilon: epsilon,
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
  // sendBlock(height,trialSgmMu,trialRT) {
  //   var start = (this.state.blockNum - 1) * (this.state.trialPerBlock + 1);
  //   // let height_tmp = slice(height, this.state.trialNum-200, this.state.trialNum+ 1);
  //   var height_tmp = height.slice(start, this.state.trialNum);
  //   var times1_tmp = this.state.times_element1.slice(
  //     start,
  //     this.state.trialNum
  //   );
  //   var times2_tmp = this.state.times_element2.slice(
  //     start,
  //     this.state.trialNum
  //   );
  //   var times3_tmp = this.state.times_element3.slice(
  //     start,
  //     this.state.trialNum
  //   );
  //   var trialSgmMu_tmp = trialSgmMu.slice(
  //     start,
  //     this.state.trialNum
  //   );
  //
  //   var indicKey_tmp = this.state.indicKey.slice(start, this.state.trialNum);
  //   var trialRT_tmp = trialRT.slice(start, this.state.trialNum);
  //
  //   var currentDate = new Date();
  //   var blockFinishTime = currentDate.toTimeString();

    // let body = {
    //   sectionStartTime: this.state.sectionStartTime,
    //   startTime: this.state.startTime,
    //   blockFinishTime: blockFinishTime,
    //   all_element_values: this.state.all_element_values,
    //   trialTotal: this.state.trialTotal,
    //   corr_elements: this.state.corPos_sq,
    //   trialSgmMu: trialSgmMu_tmp,
    //   times_element1: times1_tmp,
    //   times_element2: times2_tmp,
    //   times_element3: times3_tmp,
    //   element1Col: this.state.element1Col,
    //   element2Col: this.state.element2Col,
    //   element3Col: this.state.element3Col,
    //   startSgm: this.state.startSgm,
    //   startMu: this.state.startMu,
    //   all_true_pop_size: this.state.all_true_pop_size,
    //   indicKey: indicKey_tmp,
    //   outcomeHeight: height_tmp,
    //   trialRT: trialRT_tmp,
    //   blockTotal: this.state.blockTotal,
    //   indicReq: this.state.indicReq,
    //   trialPerBlock: this.state.trialPerBlock,
    //   blockNum: this.state.blockNum,
    // };

    // fetch(
    //   `${API_URL}/main_task/create/` +
    //     this.state.userID +
    //     `/` +
    //     this.state.study_part,
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   }
    // );

  //   if (this.state.blockNum === 1) {
  //     let taskstruct = {
  //       corPos_sq: this.state.corPos_sq,
  //       w0: this.state.w0,
  //       relevant_w: this.state.relevant_w,
  //       val_corr_elem: this.state.val_corr_elem,
  //       epsilon: this.state.epsilon,
  //       precededShift: this.state.precededShift,
  //       true_pop_size: this.state.all_true_pop_size,
  //     };
  //     fetch(
  //       `${API_URL}/task_params/create/` +
  //         this.state.userID +
  //         `/` +
  //         this.state.study_part,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(taskstruct),
  //       }
  //     );
  //   }
  //   if (this.state.blockNum >= this.state.blockTotal) {
  //     const bonisum = this.state.outcomeHeight.reduce(
  //       (result, number) => result + number
  //     );
  //
  //     var bonus = (bonisum / (89 * this.state.trialTotal)) * 5;
  //     if (bonus < 0) {
  //       bonus = 0;
  //     } else if (bonus > 5) {
  //       bonus = 5;
  //     } else {
  //       bonus = roundTo(bonus, 2); //2 dec pl
  //     }
  //
  //     let backup = {
  //       times_element1_backup: this.state.times_element1,
  //       times_element2_backup: this.state.times_element2,
  //       times_element3_backup: this.state.times_element3,
  //       trialSgmMu_backup: this.state.trialSgmMu,
  //       indicKey_backup: this.state.indicKey,
  //       trialRT_backup: this.state.trialRT,
  //       bonus: bonus,
  //     };
  //     fetch(
  //       `${API_URL}/data_backup/create/` +
  //         this.state.userID +
  //         `/` +
  //         this.state.study_part,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(backup),
  //       }
  //     );
  //
  //     this.redirectToNextStage(bonus);
  //   } else {
  //     this.setState({
  //       showBreak: 1,
  //       disp_el: 0
  //     });
  //   }
  // }
  /////////////////////////////////////////////////////////////////////////////////
  render() {
    // if (this.state.disp_el === 1) {
    //   return (
    //     <DisplayElements
    //       element1Col={this.state.element1Col}
    //       element2Col={this.state.element2Col}
    //       element3Col={this.state.element3Col}
    //       all_element_values={this.state.all_element_values}
    //       indicReq={this.state.indicReq}
    //       trialNum={this.state.trialNum}
    //       trialBlockNum={this.state.trialBlockNum}
    //       trialPerBlock={this.state.trialPerBlock}
    //       onElementsEnd={this.handleElementsData}
    //       onElementsIndic={this.handleIndicData}
    //     />
    //   );
    // }
    //
    // if (this.state.disp_slider === 1) {
      return (
        <DisplaySlider
          trialSgmMu={this.state.trialSgmMu}
          trialRT={this.state.trialRT}
          trialNum={this.state.trialNum}
          onSliderEnd={this.handleOutcomeData}
          startSgm={this.state.startSgm}
          startMu={this.state.startMu}
          all_true_pop_size={this.state.all_true_pop_size}
        />
      );
    // }
    //
    // if (this.state.disp_feedback === 1) {
    //   return (
    //     <DisplayFeedback
    //       element1Col={this.state.element1Col}
    //       element2Col={this.state.element2Col}
    //       element3Col={this.state.element3Col}
    //       all_element_values={this.state.all_element_values}
    //       all_true_pop_size={this.state.all_true_pop_size}
    //       trialSgmMu={this.state.trialSgmMu}
    //       distHeight={this.state.distHeight}
    //       indicReq={this.state.indicReq}
    //       trialNum={this.state.trialNum}
    //       onFeedbackEnd={this.handleOutcomeData}
    //     />
    //   );
    // }
    // if (this.state.showBreak === 1) {
    //   return (
    //     <DisplayBreak
    //       blockTotal={this.state.blockTotal}
    //       blockNum={this.state.blockNum}
    //       onBreakEnd={this.nextBlock}
    //     />
    //   );
    // }
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

  handleOutcomeData = (trialSgmMu, trialRT, height) => {

    var outcomeHeight_tmp = this.state.outcomeHeight;
    outcomeHeight_tmp[this.state.trialNum - 1] = height;
    this.nextTrial(outcomeHeight_tmp,trialSgmMu,trialRT);
  };

  nextBlock = () => {
    var trialNum_tmp = this.state.trialNum + 1;
    var trialBlockNum_tmp = 1;

    var blockNum_tmp = this.state.blockNum + 1;

    this.setState({
      trialNum: trialNum_tmp,
      trialBlockNum: trialBlockNum_tmp,
      disp_el: 1,
      showBreak: 0,
      blockNum: blockNum_tmp,
    });
  };

  nextTrial = (height,trialSgmMu,trialRT) => {
    var trialNum_tmp = this.state.trialNum + 1;

    if (this.state.trialBlockNum === this.state.trialPerBlock) {
      this.sendBlock(height,trialSgmMu,trialRT);
    } else {
      var trialBlockNum_tmp = this.state.trialBlockNum + 1;

      this.setState({
        trialNum: trialNum_tmp,
        trialBlockNum: trialBlockNum_tmp,
        trialSgmMu:trialSgmMu,
        trialRT: trialRT,
        height: height,
        showBreak: 0,
        disp_el: 1,
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

export default withRouter(MainTaskAdapted);
