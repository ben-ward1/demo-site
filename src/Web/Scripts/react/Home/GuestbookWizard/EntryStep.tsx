import * as React from "react";
import { Button } from "react-bootstrap";

interface IProps {
  stepNum: number;
  value: string;
  message: string;
  handleSubmit: Function;
  changeStep: Function;
}

interface IState {
  entry: string;
}

class EntryStep extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      entry: this.props.value,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(nextProps: IProps) {
    // This is a hack. Need to investigate why textarea does not clear when
    // EntryStep component is re-rendered in StepContainer.
    if (nextProps.stepNum !== this.props.stepNum) {
      (document.getElementById("entry-input") as HTMLInputElement).value =
        nextProps.value;
      this.setState({ entry: nextProps.value });
    }
  }

  handleInput(event) {
    const input = event.currentTarget.value;
    this.setState({ entry: input.length > 0 ? input : "" });
  }

  handleSave() {
    const { entry } = this.state;

    if (entry.length < 1) {
      throw "Entry is empty!";
    }

    this.props.handleSubmit(entry);

    const { changeStep, stepNum } = this.props;

    changeStep(stepNum + 1);
  }

  render() {
    const { stepNum, message, changeStep } = this.props;
    const { entry } = this.state;

    return (
      <div className="step-view-container">
        <div className="step-view-item input-container">
          {stepNum === 1 ? (
            <input
              id="entry-input"
              type="text"
              placeholder={message}
              value={entry}
              onChange={this.handleInput}
            />
          ) : (
            <textarea
              id="entry-input"
              onChange={this.handleInput}
              placeholder={message}
              value={entry}
            />
          )}
        </div>
        <div className="step-view-item">
          <div className="guestbook-wizard-controls-container">
            <Button
              className="guestbook-wizard-button primary-button"
              onClick={() => changeStep(stepNum - 1)}
              disabled={this.props.stepNum === 1}
              variant="light"
            >
              Back
            </Button>
            <Button
              className="guestbook-wizard-button primary-button"
              onClick={this.handleSave}
              disabled={entry.length < 1}
              variant="light"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EntryStep;
