import React from "react";
import EntryStep from "./EntryStep";
import ConfirmStep from "./ConfirmStep";
import SuccessStep from "./SuccessStep";

const nameMsg = "What's your name?";
const msgMsg = "Want to leave a message?";
const confirmMsg = "Confirm your name and message.";

class StepContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      name: null,
      message: null,
    };

    this.renderStep = this.renderStep.bind(this);
    this.stepCallback = this.stepCallback.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  stepCallback(stepNum, entry) {
    if (typeof stepNum !== "number" || stepNum < 1 || stepNum > 4) {
      throw "Invalid step number!";
    }

    const { name, message } = this.state;

    this.setState(
      {
        step: stepNum,
        name: stepNum === 2 && entry ? entry : stepNum === 1 ? null : name,
        message:
          stepNum === 3 && entry ? entry : stepNum === 2 ? null : message,
      },
      () => {
        this.props.stepCallback(this.state.step);
      }
    );
  }

  confirm(confirm) {
    if (confirm) {
      // I'll do something here, not sure what yet.
    }
  }

  renderStep(step) {
    switch (step) {
      case 1:
        return (
          <EntryStep
            stepNum={1}
            message={nameMsg}
            stepCallback={this.stepCallback}
          />
        );
      case 2:
        return (
          <EntryStep
            stepNum={2}
            message={msgMsg}
            stepCallback={this.stepCallback}
          />
        );
      case 3:
        return (
          <ConfirmStep
            stepNum={3}
            message={confirmMsg}
            entryName={this.state.name}
            entryMessage={this.state.message}
            stepCallback={this.stepCallback}
          />
        );
      case 4:
        const successMessage = `Thanks, ${this.state.name}! You're entry has been successfully recorded.`;
        return (
          <SuccessStep
            stepNum={4}
            message={successMessage}
            stepCallback={this.stepCallback}
          />
        );
      default:
        return <React.Fragment />;
    }
  }

  render() {
    return this.renderStep(this.state.step);
  }
}

export default StepContainer;
