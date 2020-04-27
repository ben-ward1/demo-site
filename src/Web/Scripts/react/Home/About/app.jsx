import React from "react";
import ReactDOM from "react-dom";
import Logos from "./Logos";
import TechAccordion from "./TechAccordion";
import { Layout } from "../../shared/LayoutStyledComponents";
import Footer from "../../shared/Footer";
import "../../../../Content/styles/app-style.scss";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Layout>
        <h2 class="page-header">About.</h2>
        <h4>
          This is a demo site showing off some of the technologies I develop
          with. See below for more info.
        </h4>
        <Logos />
        <TechAccordion />
        <Footer>
          <a
            className="pull-right"
            href="https://github.com/BenjaminEllisWard/demo-site"
            style={{ float: "right" }}
          >
            See this site's source code here
          </a>
        </Footer>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
