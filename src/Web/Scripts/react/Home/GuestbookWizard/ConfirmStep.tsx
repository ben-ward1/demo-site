import * as React from "react";
import { Button, Spinner } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";

interface IProps {
  stepNum: number;
  message: string;
  entryName: string;
  entryMessage: string;
  changeStep: Function;
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
      loading: false,
      captchaSuccess: false,
      captchaToken: "",
      error: "",
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.handleCaptcha = this.handleCaptcha.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCaptcha(value) {
    this.setState({ captchaSuccess: value !== null, captchaToken: value });
  }

  handleSubmit() {
    const { entryName, entryMessage, stepNum } = this.props;
    const { captchaSuccess, captchaToken } = this.state;
    let errorMsg = "";

    this.setState({ loading: true }, () => {
      if (captchaSuccess) {
        axios
          .post("Guestbook/PostEntry", {
            name: entryName,
            message: entryMessage,
            token: captchaToken,
          })
          .then((response) => {
            if (response.data.success) {
              this.props.changeStep(stepNum + 1);
            }

            this.setState({ error: "", loading: false });
          })
          .catch((error) => {
            errorMsg =
              "Oops, there was a problem submitting your request. Try again later.";
            this.setState({ error: errorMsg, loading: false });
          });
      } else {
        errorMsg = "Cannot submit without captcha!";
        this.setState({ error: errorMsg, loading: false });
      }
    });
  }

  render() {
    const { loading, captchaSuccess, error } = this.state;
    const {
      message,
      entryName,
      entryMessage,
      changeStep,
      captcha,
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
                  onClick={() => changeStep(stepNum - 1)}
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
