import * as React from "react";
import ProgressBar from "./ProgressBar";
import StepContainer from "./StepContainer";

interface IProps {
  captcha: string;
}

interface IState {
  step: number;
}

class GuestbookWizard extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

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
