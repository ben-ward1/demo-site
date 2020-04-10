import React from "react";
import { Button } from "react-bootstrap";

class ConfirmStep extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="step-view-container">
        <div className="step-view-item">{this.props.message}</div>
        <div className="step-view-item">
          <strong>Name: </strong>
          {this.props.entryName}
        </div>
        <div className="step-view-item">
          <strong>Message: </strong>
          {this.props.entryMessage}
        </div>
        <div className="step-view-item">
          <div className="guestbook-wizard-controls-container">
            <Button
              className="guestbook-entry-button primary-button"
              onClick={() => this.props.stepCallback(this.props.stepNum - 1)}
              variant="light"
            >
              Back
            </Button>
            <Button
              className="guestbook-entry-button primary-button"
              onClick={() => this.props.stepCallback(this.props.stepNum + 1)}
              variant="light"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmStep;
