import React from "react";
import { Button } from "react-bootstrap";

class EntryStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: null,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // This is a hack. Need to investigate why textarea does not clear when
    // EntryStep component is re-rendered in StepContainer.
    if (nextProps.stepNum !== this.props.stepNum) {
      document.getElementById("entry-input").value = "";
      this.setState({ entry: null });
    }
  }

  handleInput(event) {
    const input = event.currentTarget.value;
    this.setState({ entry: input.length > 0 ? input : null });
  }

  handleSave() {
    const { entry } = this.state;
    if (entry === null || entry.length < 1) {
      throw "Entry is empty!";
    }

    const { stepCallback, stepNum } = this.props;

    stepCallback(stepNum + 1, entry);
  }

  render() {
    const { stepNum, message, stepCallback } = this.props;

    return (
      <div className="step-view-container">
        <div className="step-view-item input-container">
          {stepNum === 1 ? (
            <input
              id="entry-input"
              type="text"
              placeholder={message}
              onChange={this.handleInput}
            />
          ) : (
            <textarea
              id="entry-input"
              onChange={this.handleInput}
              placeholder={message}
            />
          )}
        </div>
        <div className="step-view-item">
          <div className="guestbook-wizard-controls-container">
            <Button
              className="guestbook-wizard-button primary-button"
              onClick={() => stepCallback(stepNum - 1)}
              disabled={this.props.stepNum === 1}
              variant="light"
            >
              Back
            </Button>
            <Button
              className="guestbook-wizard-button primary-button"
              onClick={this.handleSave}
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
