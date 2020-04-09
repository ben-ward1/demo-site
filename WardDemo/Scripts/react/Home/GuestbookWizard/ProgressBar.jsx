import React from "react";
import SuccessCheckIcon from "../../shared/SuccessCheckIcon";

const numSteps = 3;

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastCompletedStep: props,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastCompletedStep !== this.state.lastCompletedStep) {
      this.setState({ lastCompletedStep: nextProps.lastCompletedStep });
    }
  }

  render() {
    const { lastCompletedStep } = this.state;

    return (
      <div className="progress-bar-container">
        {[...Array(numSteps)].map((x, index) => (
          <React.Fragment>
            <SuccessCheckIcon
              id={`check-icon-${index}`}
              className="progress-success-check"
              check={index < lastCompletedStep}
            />
            {index < numSteps - 1 && (
              <div
                className={`progress-separator ${
                  index < lastCompletedStep && "complete"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default ProgressBar;
