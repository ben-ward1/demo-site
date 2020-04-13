import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BuildBaseUrl } from "../../urlHelperFunctions";
import { Table } from "react-bootstrap";
import "../../../Content/styles/app-style.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
      selected: null,
      error: null,
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.getGuestbookData();
  }

  getGuestbookData() {
    axios.get("Guestbook/GetEntries").then((response) => {
      if (response.data) {
        this.setState({ data: response.data });
      } else {
        this.setState({ error: "No entries response!" });
      }
    });
  }

  handleSelect(index) {
    this.setState({ selected: this.state.selected === index ? null : index });
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((x, index) => (
                <tr
                  key={index}
                  className={index === this.state.selected ? "selected" : ""}
                >
                  <td>{x.name}</td>
                  <td
                    title={x.message}
                    onClick={() => this.handleSelect(index)}
                  >
                    {x.message}
                  </td>
                  <td>{new Date(x.date).toDateString().split(/ (.+)/)[1]}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
