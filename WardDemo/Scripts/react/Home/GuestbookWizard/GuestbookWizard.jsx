import React from "react";
import ProgressBar from "./ProgressBar";

class GuestbookWizard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="guestbook-wizard-container">
        <ProgressBar />
      </div>
    );
  }
}

export default GuestbookWizard;
