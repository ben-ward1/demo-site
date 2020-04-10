import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ApiChecker from "../../shared/ApiChecker";
import GuestbookWizard from "../GuestbookWizard/GuestbookWizard";
import "../../../../Content/styles/app-style.scss";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <ApiChecker />
        <h2>Sign my guestbook</h2>
        <GuestbookWizard />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
