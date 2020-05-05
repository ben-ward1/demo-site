import * as React from "react";
import SuccessCheckIcon from "../../shared/SuccessCheckIcon";

interface IProps {
  lastCompletedStep: number;
  numSteps: number;
}

interface IState {
  lastCompletedStep: number;
}

class ProgressBar extends React.Component<IProps, IState> {
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
    const { numSteps } = this.props;

    return (
      <div className="progress-bar-container">
        {[...Array(numSteps)].map((x, index) => (
          <React.Fragment key={index}>
            <SuccessCheckIcon
              id={`check-icon-${index}`}
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
