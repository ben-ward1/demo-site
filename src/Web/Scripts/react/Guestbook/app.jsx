import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BuildBaseUrl } from "../../urlHelperFunctions";
import { Table, Spinner } from "react-bootstrap";
import "../../../Content/styles/app-style.scss";

const isIE = window.navigator.userAgent.indexOf("Trident") != -1;
const navbarHeight = document.getElementById("main-navbar-header").offsetHeight;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
      selected: null,
      error: null,
      loading: true,
      shouldStick: false,
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.handleSelect = this.handleSelect.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.resizeShadow = this.resizeShadow.bind(this);
  }

  componentDidMount() {
    if (!isIE) {
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.resizeShadow);
    }
    this.getGuestbookData();
  }

  componentWillUnmount() {
    if (!isIE) {
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("resize", this.resizeShadow);
    }
  }

  componentDidUpdate() {
    this.resizeShadow();
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

  handleScroll() {
    if (this.state.data.length > 0) {
      const headerOffset = document
        .getElementById("sticky-table-header")
        .getBoundingClientRect().top;

      this.setState({ shouldStick: headerOffset < navbarHeight });
    }
  }

  resizeShadow() {
    // TODO: Figure out why shadow width is limited to on-screen portion of header in mobile view
    if (this.state.shouldStick) {
      const xDiff = 20;
      const shadow = document.getElementById("sticky-header-box-shadow");

      const headerRect = document
        .getElementById("sticky-table-header")
        .getBoundingClientRect();

      shadow.style.left = `${headerRect.left + xDiff / 2}px`;
      shadow.style.width = `${headerRect.width - xDiff}px`;
    }
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
              <tr
                id="sticky-table-header"
                className={`${
                  this.state.shouldStick ? "sticky-table-header" : ""
                }`}
              >
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

        <div
          id="sticky-header-box-shadow"
          className={this.state.shouldStick ? "visible" : ""}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
