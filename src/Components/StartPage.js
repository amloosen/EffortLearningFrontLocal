import React from "react";
import { withRouter } from "react-router-dom";
import * as Consent from "survey-react";
import { API_URL } from "../config";
import "../../node_modules/survey-react/survey.css";
import queryString from "query-string"; // I need this for prolific
import "./style/startStyle.css";
////////////////////////////////////////////////////////////////////////////////
class StartPage extends React.Component {
  constructor(props) {
    super(props);

    // Get data and time
    var dateAndTime = new Date().toLocaleString();

    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var dateString = date + "-" + (month + 1) + "-" + year;

    // Gen a random 6 digit number for now
    // var prolific_id = Math.floor(100000 + Math.random() * 900000);//debugger

    let url = this.props.location.search;
    let params = queryString.parse(url);
    const prolific_id =
      params["PROLIFIC_PID"] === undefined
        ? "undefined"
        : params["PROLIFIC_PID"];
    console.log(prolific_id);


    // Set state
    this.state = {
      userID: prolific_id,
      date: dateString,
      dateAndTime: dateAndTime,
      startTime: timeString,
      consentComplete: 0,
      study_part: 0,
    };

    this.redirectToTarget = this.redirectToTarget.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  redirectToTarget() {
    let body = {
      startTime: this.state.startTime,
      dateAndTime: this.state.dateAndTime,
    };

    fetch(
      `${API_URL}/start_info/create/` +
        this.state.userID +
        `/` +
        this.state.study_part,
      {
        //eigentlich auch in den body beim ersten mal
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    this.setState({
      consentComplete: 1,
    });

    this.props.history.push({
      pathname: `/SliderIntro`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  }

  render() {
    // var consentstyle = Consent.StylesManager.applyTheme('default');
    let defaultThemeColors = Consent.StylesManager.ThemeColors["default"];

    // Change the main color
    defaultThemeColors["$main-color"] = "#363868";
    defaultThemeColors["$sv_complete_btn"] = "#8c94b4";
    // Apply your changes
    Consent.StylesManager.applyTheme();
    // Full consent, non-NHS version
    var json1 = {
      title: null,
      pages: [
        {
          questions: [
            {
              type: "html",
              name: "info",
              html: "<b>General Information",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p>In this study, you will be asked to play a game that involves making choices to earn rewards. You will receive an additional bonus payment if you perform well in this game. Please make sure to complete the game in <strong>one go</strong>. Short breaks will be given in between. The game will take between 1h and 1.5h.</p>",
            },

            {
              type: "html",
              name: "info",
              html: "<b>Prerequisites</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p>Please note that this game must be played on a <strong>DESKTOP/LAPTOP</strong> (not a tablet/mobile phone). Otherwise, it won't work! Additionally, please use <strong>Chrome</strong> or <strong>Safari as abrowser</strong>.</p>",
            },

            {
              type: "html",
              name: "info",
              html: "<b>Eyesight</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p>If you do have impaired vision, please make sure to wear your glasses or contact lenses while playing the game to ensure normal eyesight.</p>",
            },


            { type: "html", name: "info", html: "<b>Questions</b>" },

            {
              type: "html",
              name: "info",
              html:
                "<p>If you have any questions or concerns at any point before or during the game, or experience difficulties completing it, please email me via alisa.loosen@yale.edu or a.loosen.17@ucl.ac.uk. I can also call you if necessary.</p>",
            },


          ],
        },
        {
          questions: [
            {
              type: "checkbox",
              name: "checkbox1",
              title:
                "I have read the information above, and understand what the study involves.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox2",
              title:
                "I am using a desktop and Safari or Chrome browser.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox3",
              title:
                "I have normal vision or corrected vision (wearing glasses or contact lenses if necessary.)",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox4",
              title:
                "I will play this game in one go, without long interrupts.",
              isRequired: true,
              choices: ["Yes"],
            },

          ],
        },
      ],
    };

    if (this.state.consentComplete === 0) {
      return (
        <div className="placeMiddle">
          <div className="placeMiddleHeader">
            INFORMATION FOR THE PARTICIPANT
          </div>
          <br />
          Please read this information page carefully. If you are happy to
          proceed and fulfill all requirements, please check the boxes on the second page of this form.
          <br />
          <br />
          <div className="surveyElement">
            <Consent.Survey
              json={json1}
              showCompletedPage={false}
              onComplete={this.redirectToTarget}
            />
          </div>
        </div>
      );
    } else {
      // this.redirectToTarget();
      console.log("ERROR This should have given consent.");
      return null;
    }
  }
}

export default withRouter(StartPage);
