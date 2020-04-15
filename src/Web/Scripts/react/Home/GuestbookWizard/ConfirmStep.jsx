import React from "react";
import { Button, Spinner } from "react-bootstrap";

class ConfirmStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  render() {
    return (
      <div className="step-view-container">
        {this.state.loading ? (
          <div className="step-view-item">
            <Spinner animation="border" />
          </div>
        ) : (
          <React.Fragment>
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
                  className="guestbook-wizard-button primary-button"
                  onClick={() =>
                    this.props.stepCallback(this.props.stepNum - 1)
                  }
                  variant="light"
                >
                  Back
                </Button>
                <Button
                  className="guestbook-wizard-button primary-button"
                  onClick={() =>
                    this.props.stepCallback(this.props.stepNum + 1)
                  }
                  variant="light"
                >
                  Submit
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ConfirmStep;
