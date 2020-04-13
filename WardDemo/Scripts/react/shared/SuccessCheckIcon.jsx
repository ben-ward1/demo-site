import React from "react";

const style = {
  filter: "url(#dropshadow)",
};

class SuccessCheckIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toCheck: this.props.check,
      checked: false,
    };
  }

  componentDidMount() {
    this.animate(this.state.toCheck);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.check !== this.state.toCheck) {
      this.setState({ checked: false, toCheck: nextProps.check }, () => {
        this.animate(nextProps.check);
      });
    }
  }

  animate(toCheck) {
    this.setState({ toCheck: false, checked: false });

    if (toCheck) {
      this.setState({ toCheck }, () => {
        this.setState({ checked: true });
      });
    }
  }

  render() {
    return (
      <svg
        viewBox="0 0 100 100"
        id={this.props.id}
        className={`success-check ${this.state.toCheck && "animate"}`}
      >
        <filter id="dropshadow" height="100%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feFlood
            floodColor="rgba(76, 175, 80, 1)"
            floodOpacity="0.5"
            result="color"
          />
          <feComposite in="color" in2="blur" operator="in" result="blur" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <circle
          cx="50"
          cy="50"
          r="46.5"
          fill="none"
          stroke="rgba(76, 175, 80, 0.5)"
          strokeWidth="5"
        />

        <path
          opacity={this.state.checked ? "100" : "0"}
          d="M67,93 A46.5,46.5 0,1,0 7,32 L43,67 L88,19"
          fill="none"
          stroke="rgba(76, 175, 80, 1)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="80 1000"
          strokeDashoffset="-220"
          style={style}
        />
      </svg>
    );
  }
}

export default SuccessCheckIcon;
