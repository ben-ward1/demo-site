import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "react-bootstrap";
import { ToggleChat } from "./ChatHelperFunctions";
import {
  ChatNameInputContainer,
  NameInputControlsContainer,
  RecaptchaContainer,
} from "./ChatStyledComponents";

const recaptchaRef = React.createRef<ReCAPTCHA>();

interface IProps {
  enterChatCallback: Function;
  captcha: string;
}

class ChatNameInput extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);

    this.handleCaptcha = this.handleCaptcha.bind(this);
    this.handleExpire = this.handleExpire.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    (document.getElementById(
      "enter-chat-button"
    ) as HTMLButtonElement).disabled = true;
  }

  handleCaptcha() {
    const nameEl = document.getElementById(
      "chat-name-input"
    ) as HTMLInputElement;
    const name = nameEl.value;
    const isValid = name.length > 0;

    (document.getElementById(
      "enter-chat-button"
    ) as HTMLButtonElement).disabled = !isValid;

    if (!isValid) {
      recaptchaRef.current!.reset();
    } else {
      nameEl.disabled = true;
    }
  }

  handleExpire() {
    (document.getElementById(
      "chat-name-input"
    ) as HTMLInputElement).disabled = false;

    (document.getElementById(
      "enter-chat-button"
    ) as HTMLButtonElement).disabled = true;
  }

  handleSubmit() {
    const name = (document.getElementById(
      "chat-name-input"
    ) as HTMLInputElement).value;
    this.props.enterChatCallback(name);
  }

  render() {
    const { captcha } = this.props;

    return (
      <ChatNameInputContainer>
        <NameInputControlsContainer>
          <input
            id="chat-name-input"
            type="text"
            maxLength={20}
            placeholder="What is your name?"
          />
          <RecaptchaContainer>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={captcha}
              onChange={this.handleCaptcha}
              onExpired={this.handleExpire}
            />
          </RecaptchaContainer>
          <Button
            variant="light"
            className="primary-button"
            id="enter-chat-button"
            onClick={this.handleSubmit}
          >
            Enter Chat
          </Button>
          <Button
            variant="light"
            className="primary-button"
            onClick={ToggleChat}
          >
            Back
          </Button>
        </NameInputControlsContainer>
      </ChatNameInputContainer>
    );
  }
}

export default ChatNameInput;
