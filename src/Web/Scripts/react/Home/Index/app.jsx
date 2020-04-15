import React from "react";
import ReactDOM from "react-dom";
import ApiChecker from "../../shared/ApiChecker";
import GuestbookWizard from "../GuestbookWizard/GuestbookWizard";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <ApiChecker />
        <h2>Sign my guestbook</h2>
        <GuestbookWizard />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
