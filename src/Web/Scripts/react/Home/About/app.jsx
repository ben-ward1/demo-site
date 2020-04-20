import React from "react";
import ReactDOM from "react-dom";
import Logos from "./Logos";
import TechAccordion from "./TechAccordion";
import "../../../../Content/styles/app-style.scss";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <Logos />
        <TechAccordion />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
