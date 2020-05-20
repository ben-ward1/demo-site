import * as React from "react";
import { Dispatch } from "react";
import { connect } from "react-redux";
import { IAppState } from "../Index/store";
import {
  SetName,
  SetMessage,
  ChangeStep,
  ResetWizard,
  IAction,
} from "../Index/actions";
import EntryStep from "./EntryStep";
import ConfirmStep from "./ConfirmStep";
import SuccessStep from "./SuccessStep";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import axios from "axios";

const nameMsg = "What's your name?";
const msgMsg = "Want to leave a message?";
const confirmMsg = "Confirm your name and message.";

interface IProps {
  stepCallback: Function;
  captcha: string;
}

interface IStateProps {
  name: string;
  message: string;
  step: number;
}

interface IDispatchProps {
  setName: Function;
  setMessage: Function;
  changeStep: Function;
  resetWizard: Function;
}

type Props = IProps & IStateProps & IDispatchProps;

interface IState {
  name: string;
  message: string;
  errorOnPost: boolean;
}

class StepContainer extends React.Component<Props, IState> {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      message: "",
      errorOnPost: false,
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.renderStep = this.renderStep.bind(this);
    this.stepCallback = this.stepCallback.bind(this);
  }

  stepCallback(stepNum, token) {
    if (typeof stepNum !== "number" || stepNum < 1 || stepNum > 4) {
      throw `Invalid step number: ${stepNum.toString()}`;
    }

    const { name, message } = this.state;

    if (stepNum === 4) {
      this.setState({ errorOnPost: false }, () => {
        axios
          .post("Guestbook/PostEntry", {
            name,
            message,
            token,
          })
          .then((response) => {
            if (response.data.success) {
              this.props.changeStep(stepNum);
            }
          })
          .catch((error) => {
            if (error) {
              this.setState({ errorOnPost: true }, () => {
                this.props.changeStep(stepNum);
              });
            }
          });
      });
    } else {
      this.props.changeStep(stepNum);
    }
  }

  renderStep(step) {
    const {
      name,
      message,
      setName,
      setMessage,
      changeStep,
      resetWizard,
      captcha,
    } = this.props;

    switch (step) {
      case 1:
        return (
          <EntryStep
            stepNum={step}
            value={name}
            message={nameMsg}
            handleSubmit={setName}
            changeStep={changeStep}
          />
        );
      case 2:
        return (
          <EntryStep
            stepNum={step}
            value={message}
            message={msgMsg}
            handleSubmit={setMessage}
            changeStep={changeStep}
          />
        );
      case 3:
        return (
          <ConfirmStep
            stepNum={step}
            message={confirmMsg}
            entryName={name}
            entryMessage={message}
            changeStep={changeStep}
            captcha={captcha}
          />
        );
      case 4:
        const successMessage = `Thanks, ${name}! You're entry has been successfully recorded.`;
        const errorMessage = "Oops! Something went wrong. Try again later.";
        return (
          <SuccessStep
            message={this.state.errorOnPost ? errorMessage : successMessage}
            resetWizard={resetWizard}
          />
        );
      default:
        return <React.Fragment />;
    }
  }

  render() {
    return this.renderStep(this.props.step);
  }
}

export const mapStateToProps = (state: IAppState) => {
  return {
    name: state.app.name,
    message: state.app.message,
    step: state.app.step,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    setName: (name: string) => dispatch(SetName(name)),
    setMessage: (message: string) => dispatch(SetMessage(message)),
    changeStep: (step: number) => dispatch(ChangeStep(step)),
    resetWizard: () => dispatch(ResetWizard()),
  };
};

export default connect<IStateProps, IDispatchProps, IProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(StepContainer);
