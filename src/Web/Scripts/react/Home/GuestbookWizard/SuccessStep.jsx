import React from "react";
import { Button } from "react-bootstrap";

class SuccessStep extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="step-view-container">
        <div className="step-view-item">{this.props.message}</div>
        <div className="step-view-item">
          <div className="guestbook-wizard-controls-container">
            <Button
              className="guestbook-wizard-button primary-button"
              onClick={() => this.props.stepCallback(1)}
              variant="light"
            >
              Go Again
            </Button>
            <Button
              className="guestbook-wizard-button primary-button"
              variant="light"
              href={"Guestbook/Index"}
            >
              See Guestbook
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessStep;
