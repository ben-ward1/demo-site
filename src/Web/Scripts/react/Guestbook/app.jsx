import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BuildBaseUrl } from "../../urlHelperFunctions";
import { Table, Spinner } from "react-bootstrap";
import "../../../Content/styles/app-style.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
      selected: null,
      error: null,
      loading: true,
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
        this.setState({ data: response.data.entries, loading: false });
      } else {
        this.setState({ error: "No entries response!", loading: false });
      }
    });
  }

  handleSelect(index) {
    this.setState({ selected: this.state.selected === index ? null : index });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="guestbook-container">
        {this.state.loading ? (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
