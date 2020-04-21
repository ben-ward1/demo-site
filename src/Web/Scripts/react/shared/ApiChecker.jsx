import React from "react";
import axios from "axios";
import { Spinner, Popover, OverlayTrigger } from "react-bootstrap";
import { faSyncAlt, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuccessCheckIcon from "../shared/SuccessCheckIcon";
import { BuildBaseUrl } from "../../urlHelperFunctions";

library.add(faSyncAlt, faQuestionCircle);

const popover = (
  <Popover>
    <Popover.Title as="h3">Oops!</Popover.Title>
    <Popover.Content>
      We didn't get a valid response from the api. This can happen for a number
      of reasons, but I've probably just taken its hosting instance down for
      development purposes.
    </Popover.Content>
  </Popover>
);

class ApiChecker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: null,
      errorMsg: null,
      loading: true,
    };

    axios.defaults.baseURL = BuildBaseUrl();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.checkApiConnection();
  }

  handleClick() {
    this.setState({ loading: true }, () => {
      this.checkApiConnection();
    });
  }

  checkApiConnection() {
    const thisComponent = this;

    this.setState({ connected: null, errorMsg: null }, () => {
      setTimeout(function () {
        axios
          .get("home/test")
          .then((response) => {
            if (response.data) {
              thisComponent.setState({ connected: response.data.success });
            } else {
              throw "No response from api";
            }

            thisComponent.setState({ loading: false });
          })
          .catch(function (e) {
            thisComponent.setState({
              errorMsg: "Oops, something went wrong: " + e,
              loading: false,
            });
          });
        // set an arbitrary amount of time here just for demonstration
      }, 1200);
    });
  }

  BuildResponseText(connected, errorMsg) {
    if (!errorMsg) {
      return (
        <div id="response-text" className={connected && "connected"}>
          {connected ? "API: Connected!" : "API: Checking..."}
        </div>
      );
    } else {
      return (
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="bottom"
          overlay={popover}
        >
          <div id="response-text">
            <div>API: Down</div>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </div>
        </OverlayTrigger>
      );
    }
  }

  render() {
    const { errorMsg, connected } = this.state;

    return (
      <div id="api-response-container">
        <div id="api-response-item">
          <SuccessCheckIcon id="api-check" check={connected} />
          {this.BuildResponseText(connected, errorMsg)}
          <div className="api-checker-action-container">
            {this.state.loading ? (
              <Spinner
                className="api-checker-spinner"
                animation="border"
                size="sm"
              />
            ) : (
              <FontAwesomeIcon
                id="sync-icon"
                icon={faSyncAlt}
                onClick={this.handleClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ApiChecker;
