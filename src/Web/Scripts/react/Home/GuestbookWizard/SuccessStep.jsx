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
              className="primary-button success-button"
              onClick={() => this.props.stepCallback(1)}
              variant="light"
            >
              Go Again
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessStep;
