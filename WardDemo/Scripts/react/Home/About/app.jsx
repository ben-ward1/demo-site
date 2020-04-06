import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";

class App extends React.Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = BuildBaseUrl();
  }

  render() {
    return <div>Here is more react stuff.</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
