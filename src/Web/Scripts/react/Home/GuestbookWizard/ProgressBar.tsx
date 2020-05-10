import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../Index/store";
import SuccessCheckIcon from "../../shared/SuccessCheckIcon";

interface IProps {
  numSteps: number;
}

interface IStateProps {
  step: number;
}

type Props = IProps & IStateProps;

interface IState {
  lastCompletedStep: number;
}

class ProgressBar extends React.Component<Props, IState> {
  constructor(props) {
    super(props);

    // this.state = {
    //   lastCompletedStep: props,
    // };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.lastCompletedStep !== this.state.lastCompletedStep) {
  //     this.setState({ lastCompletedStep: nextProps.lastCompletedStep });
  //   }
  // }

  render() {
    const lastCompletedStep = this.props.step - 1;
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

export const mapStateToProps = (state: IAppState) => {
  return {
    step: state.app.step,
  };
};

export default connect<IStateProps>(mapStateToProps)(ProgressBar);

//export default ProgressBar;
