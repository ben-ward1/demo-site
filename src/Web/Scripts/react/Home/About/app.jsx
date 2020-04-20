import React from "react";
import ReactDOM from "react-dom";
import Logos from "./Logos";
import TechAccordion from "./TechAccordion";
import Footer from "../../shared/Footer";
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
        <Footer>
          <a
            className="pull-right"
            href="https://github.com/BenjaminEllisWard/demo-site"
          >
            See this site's source code here
          </a>
        </Footer>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
