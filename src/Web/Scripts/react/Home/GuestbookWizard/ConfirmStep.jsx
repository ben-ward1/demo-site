import React from "react";
import { Button, Spinner } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";

class ConfirmStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
      captchaSuccess: false,
      error: null,
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
    axios
      .post("captcha/verify", { token: value })
      .then((response) => {
        if (response.data.success) {
          this.setState({ captchaSuccess: true, error: null });
        } else {
          throw "Cannot verify captcha.";
        }
      })
      .catch((e) => {
        this.setState({ error: "Cannot verify captcha!" });
        console.log("Failed submission: " + e);
      });
  }

  handleSubmit() {
    const { stepCallback, stepNum } = this.props;
    if (this.state.captchaSuccess) {
      stepCallback(stepNum + 1);
    } else {
      this.setState({ error: "Cannot submit without captcha!" });
    }
  }

  render() {
    const { loading, captchaSuccess, error } = this.state;
    const {
      message,
      entryName,
      entryMessage,
      captcha,
      stepCallback,
    } = this.props;

    return (
      <div className="step-view-container">
        {loading ? (
          <div className="step-view-item">
            <Spinner animation="border" />
          </div>
        ) : (
          <React.Fragment>
            <div className="step-view-item">{error ? error : message}</div>
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
