import React from "react";
import EntryStep from "./EntryStep";
import ConfirmStep from "./ConfirmStep";
import SuccessStep from "./SuccessStep";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import axios from "axios";

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
      loading: false,
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.renderStep = this.renderStep.bind(this);
    this.stepCallback = this.stepCallback.bind(this);
  }

  stepCallback(stepNum, entry) {
    const { name, message } = this.state;

    if (stepNum === 4) {
      this.setState({ loading: true }, () => {
        axios
          .post("Guestbook/PostEntry", {
            name: name,
            message: message,
          })
          .then((response) => {
            if (response.data.success) {
              this.step(stepNum, entry);
            }

            this.setState({ loading: false });
          });
      });
    } else {
      this.step(stepNum, entry);
    }
  }

  step(stepNum, entry) {
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
            loading={this.state.loading}
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
