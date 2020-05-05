import * as React from "react";
import { Button, Spinner } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";

interface IProps {
  stepNum: number;
  loading: boolean;
  message: string;
  entryName: string;
  entryMessage: string;
  stepCallback: Function;
  captcha: string;
}

interface IState {
  loading: boolean;
  captchaSuccess: boolean;
  captchaToken: string;
  error: string;
}

class ConfirmStep extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
      captchaSuccess: false,
      captchaToken: "",
      error: "",
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.handleCaptcha = this.handleCaptcha.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  handleCaptcha(value) {
    this.setState({ captchaSuccess: value !== null, captchaToken: value });
  }

  handleSubmit() {
    const { stepCallback, stepNum } = this.props;
    let errorMsg = "";

    if (this.state.captchaSuccess) {
      stepCallback(stepNum + 1, "", this.state.captchaToken);
    } else {
      errorMsg = "Cannot submit without captcha!";
    }

    this.setState({ error: errorMsg });
  }

  render() {
    const { loading, captchaSuccess, error } = this.state;
    const {
      message,
      entryName,
      entryMessage,
      captcha,
      stepCallback,
      stepNum,
    } = this.props;

    return (
      <div className="step-view-container">
        {loading ? (
          <div className="step-view-item">
            <Spinner animation="border" />
          </div>
        ) : (
          <React.Fragment>
            <div className="step-view-item">
              {error.length > 0 ? error : message}
            </div>
            <div className="step-view-item">
              <strong>Name: </strong>
              {entryName}
            </div>
            <div className="step-view-item">
              <strong>Message: </strong>
              {entryMessage}
            </div>
            {captcha && (
              <div className="step-view-item">
                <div className="recaptcha-container">
                  <ReCAPTCHA sitekey={captcha} onChange={this.handleCaptcha} />
                </div>
              </div>
            )}
            <div className="step-view-item">
              <div className="guestbook-wizard-controls-container">
                <Button
                  className="guestbook-wizard-button primary-button"
                  onClick={() => stepCallback(stepNum - 1)}
                  variant="light"
                >
                  Back
                </Button>
                <Button
                  className="guestbook-wizard-button primary-button"
                  disabled={!captchaSuccess}
                  onClick={this.handleSubmit}
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
