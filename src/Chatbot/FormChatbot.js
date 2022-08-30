import React, { Component } from "react";
import ChatBot, { Loading } from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import Post from "./Post";
//Wikipedia search function
class DBPedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: "",
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.search.value;
    const endpoint = encodeURI("https://dbpedia.org");
    const query = encodeURI(`
      select * where {
      ?x rdfs:label "${search}"@en .
      ?x rdfs:comment ?comment .
      FILTER (lang(?comment) = 'en')
      } LIMIT 100
    `);

    const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri=${endpoint}&query=${query}&format=json`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText);
        const bindings = data.results.bindings;
        if (bindings && bindings.length > 0) {
          self.setState({ loading: false, result: bindings[0].comment.value });
        } else {
          self.setState({ loading: false, result: "Not found." });
        }
      }
    }

    xhr.open("GET", queryUrl);
    xhr.send();
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        {loading ? <Loading /> : result}
        {!loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {!trigger && (
              <button onClick={() => this.triggetNext()}>Search Again</button>
            )}
          </div>
        )}
      </div>
    );
  }
}

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
//Themes wrapper for chatbot
const theme = {
  //Only accepts hex color codes
  background: "#FDEEDC",
  fontFamily: "Trebuchet MS",
  headerBgColor: "#E38B29",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#F1A661",
  botFontColor: "#fff",
  userBubbleColor: "#FFD8A9",
  userFontColor: "#000000",
};
//Class saves information
class Review extends Component {
  //Default constructor
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      weight: "",
      diet: "",
    };
  }
  componentWillMount() {
    //Always
    const { steps } = this.props;
    const { name, gender, weight, diet } = steps;

    this.setState({ name, gender, weight, diet });
  }
  //Render method is necessary for the chatbot
  render() {
    const { name, gender, weight, diet } = this.state;
    return (
      <div>
        <h2>Saved Information</h2>
        <div>
          <h3>Name</h3>
          <p>{name.value}</p>
          <h3>Gender</h3>
          <p>{gender.value}</p>
          <h3>Weight</h3>
          <p>{weight.value}</p>
          <h3>Diet</h3>
          <p>{diet.value}</p>
        </div>
      </div>
    );
  }
}
Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

//Make sure in class that extends component, almost exactly like reg comp
//If want to add them import ThemeProvider from 'styled-components'
//Then make const theme and wrap chatbot in ThemeProvider component setting theme to theme

//To config make config object then add after steps
const config = {
  width: "300px",
  height: "400px",
  floating: true,
};

class Simpleform extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={[
            {
              id: "1",
              message: "Hello. What is your name?",
              trigger: "name",
            },
            {
              id: "name",
              user: true,
              trigger: "3",
            },
            {
              id: "3",
              message: "Hi {previousValue}! What is your gender?",
              trigger: "gender",
            },
            {
              //Option must have value, label, and trigger props
              id: "gender",
              options: [
                { value: "male", label: "Male", trigger: "weight-message" },
                { value: "female", label: "Female", trigger: "weight-message" },
                { value: "other", label: "Other", trigger: "weight-message" },
              ],
            },
            //Ask weight
            {
              id: "weight-message",
              message: "How would you describe your weight?",
              trigger: "weight",
            },
            {
              id: "weight",
              options: [
                {
                  value: "underweight",
                  label: "Underweight",
                  trigger: "diet-message",
                },
                { value: "average", label: "Average", trigger: "diet-message" },
                {
                  value: "overweight",
                  label: "Overweight",
                  trigger: "diet-message",
                },
              ],
            },
            {
              id: "diet-message",
              message:
                "Here are some suggested food groups for {previousValue}," +
                "please choose one that you're interested in!",
              trigger: "diet",
            },
            {
              id: "diet",
              options: [
                {
                  value: "high-carb",
                  label: "High carb (Underweight)",
                  trigger: "9",
                },
                {
                  value: "low-fat",
                  label: "Low fat (Overweight)",
                  trigger: "9",
                },
                {
                  value: "whole-grain",
                  label: "Whole-grain breads",
                  trigger: "9",
                },
                {
                  value: "fruit-veggie",
                  label: "Fruits and vegetables",
                  trigger: "9",
                },
              ],
            },
            {
              id: "9",
              message: "Great! Check out your summary",
              trigger: "review",
            },
            {
              id: "review",
              component: <Review />,
              asMessage: true,
              trigger: "update",
            },

            {
              id: "update",
              message: "Would you like to update some field?",
              trigger: "update-question",
            },
            {
              id: "update-question",
              options: [
                { value: "no", label: "Yes", trigger: "update-yes" },
                { value: "yes", label: "No", trigger: "search-message" },
              ],
            },
            {
              id: "update-yes",
              message: "What field would you like to update?",
              trigger: "update-fields",
            },
            {
              id: "update-fields",
              options: [
                { value: "name", label: "Name", trigger: "name-change" },
                { value: "gender", label: "Gender", trigger: "gender-change" },
                { value: "weight", label: "Weight", trigger: "weight-change" },
                { value: "diet", label: "Food Group", trigger: "diet-change" },
              ],
            },
            //Name changing
            {
              id: "name-change",
              message: "Enter your name",
              trigger: "update-name",
            },
            {
              id: "update-name",
              update: "name",
              trigger: "9",
            },
            //Gender changing
            {
              id: "gender-change",
              message: "Choose your gender",
              trigger: "update-gender",
            },
            {
              id: "update-gender",
              update: "gender",
              trigger: "9",
            },
            //Weight changing
            {
              id: "weight-change",
              message: "Choose your weight",
              trigger: "update-weight",
            },
            {
              id: "update-weight",
              update: "weight",
              trigger: "9",
            },
            //Diet changing
            {
              id: "diet-change",
              message: "Choose your food group interest",
              trigger: "update-diet",
            },
            {
              id: "update-diet",
              update: "diet",
              trigger: "9",
            },
            //End
            {
              id: "search-message",
              message: `To learn more about your food group or for general info,
              message the bot to search on wikipedia!`,
              trigger: "search",
            },
            {
              id: "search",
              user: true,
              trigger: "lookup",
            },
            {
              id: "lookup",
              component: <DBPedia />,
              trigger: "ask-again-message",
            },
            {
              id: "ask-again-message",
              message: "Would you like to search again?",
              trigger: "choice-again",
            },
            {
              id: "choice-again",
              options: [
                { value: "no", label: "No", trigger: "end-message" },
                { value: "yes", label: "Yes", trigger: "search-message" },
              ],
            },
            {
              id: "end-message",
              component: <Post userData={this.state} />,
              asMessage: true,
              //Post data
              end: true,
            },
          ]}
          {...config} // Spread operator
        />
      </ThemeProvider>
    );
  }
}

export default Simpleform;
