import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      someValue: null,
    };

    axios.defaults.baseURL = BuildBaseUrl();
  }

  componentDidMount() {
    axios
      .get("home/test")
      .then((response) => {
        this.setState({ someValue: response.data });
      })
      .catch((e) => {
        this.setState({ someValue: "Oops, something went wrong: " + e });
      });
  }

  render() {
    return (
      <Fragment>
        <h1>Here's react again</h1>
        <div>Hello again</div>
        {this.state.someValue ? (
          <div>{this.state.someValue}</div>
        ) : (
          <div>This is a place holder until the api call returns.</div>
        )}
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
