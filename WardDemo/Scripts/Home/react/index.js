import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import BuildBaseUrl from "../../urlHelperFunctions";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      someValue: null,
    };

    axios.defaults.baseURL = BuildBaseUrl();
  }

  componentDidMount() {
    // try {
    //   axios.get("/values/5").then((response) => {
    //     this.setState({
    //       someValue: "testing agaaaaain",
    //     });

    //     if (response.data) {
    //       this.setState({
    //         someValue: response.data,
    //       });
    //     }
    //   });
    // } catch (e) {
    //   this.setState({
    //     someValue: e,
    //   });
    // }
    try {
      axios({
        method: "get",
        url: "/home/test",
        responseType: "application/json",
      }).then((response) => {
        this.setState({ someValue: response.data });
      });
    } catch (e) {
      this.setState({
        someValue: e.toString(),
      });
    }

    // this.setState({
    //   someValue: "try this",
    // });
  }

  render() {
    return (
      <Fragment>
        <h1>Here's react again</h1>
        <div>Hello again</div>
        {this.state.someValue ? (
          <div>{this.state.someValue}</div>
        ) : (
          <div>How about this???</div>
        )}
      </Fragment>
    );
  }
}

// const App = () => (
//   <Fragment>
//     <h1>Here's React</h1>
//     <div>Hello World</div>
//   </Fragment>
// );
ReactDOM.render(<App {...window.model} />, document.getElementById("app"));
