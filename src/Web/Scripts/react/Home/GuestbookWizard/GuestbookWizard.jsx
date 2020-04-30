import React from "react";
import ProgressBar from "./ProgressBar";
import StepContainer from "./StepContainer";

class GuestbookWizard extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 1,
    };

    this.stepCallback = this.stepCallback.bind(this);
  }

  stepCallback(step) {
    this.setState({ step });
  }

  render() {
    return (
      <div className="guestbook-wizard-container">
        <ProgressBar numSteps={3} lastCompletedStep={this.state.step - 1} />
        <StepContainer
          stepCallback={this.stepCallback}
          captcha={this.props.captcha}
        />
      </div>
    );
  }
}

export default GuestbookWizard;
