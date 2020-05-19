import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";
import { BuildBaseUrl } from "../../urlHelperFunctions";
import { Table, Spinner } from "react-bootstrap";
import { Layout } from "../shared/LayoutStyledComponents";
import "../../../Content/styles/app-style.scss";

const isIE = window.navigator.userAgent.indexOf("Trident") != -1;

const navbarHeight = 50;

class App extends React.Component<{}, any> {
  constructor(props) {
    super(props);

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
    axios
      .get("Guestbook/GetEntries")
      .then((response) => {
        if (response.data) {
          this.setState({
            data: response.data.entries,
            error: null,
            loading: false,
          });
        } else {
          this.setState({ error: "No entries response!", loading: false });
        }
      })
      .catch((error) => {
        this.setState({ error: "No entries response!", loading: false });
      });
  }

  handleSelect(index) {
    this.setState({ selected: this.state.selected === index ? null : index });
  }

  handleScroll() {
    if (this.state.data.length > 0) {
      const headerOffset = document
        .getElementById("sticky-table-header")!
        .getBoundingClientRect().top;

      this.setState({ shouldStick: headerOffset < navbarHeight });
    }
  }

  resizeShadow() {
    // TODO: Figure out why shadow width is limited to on-screen portion of header in mobile view
    if (this.state.shouldStick) {
      const xDiff = 20;
      const shadow = document.getElementById("sticky-header-box-shadow")!;

      const headerRect = document
        .getElementById("sticky-table-header")!
        .getBoundingClientRect();

      shadow.style.left = `${headerRect.left + xDiff / 2}px`;
      shadow.style.width = `${headerRect.width - xDiff}px`;
    }
  }

  render() {
    const { data, loading, error, shouldStick, selected } = this.state;
    return (
      <Layout>
        <h2 className="page-header">Guestbook.</h2>
        {error ? (
          <h4>Oops, something went wrong. Try again later</h4>
        ) : (
          <div className="guestbook-container">
            {loading ? (
              <div className="spinner-container">
                <Spinner animation="border" />
              </div>
            ) : (
              <Table>
                <thead>
                  <tr
                    id="sticky-table-header"
                    className={`${shouldStick ? "sticky-table-header" : ""}`}
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
                        className={index === selected ? "selected" : ""}
                      >
                        <td>{x.name}</td>
                        <td
                          title={x.message}
                          onClick={() => this.handleSelect(index)}
                        >
                          {x.message}
                        </td>
                        <td>
                          {new Date(x.date).toDateString().split(/ (.+)/)[1]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}

            <div
              id="sticky-header-box-shadow"
              className={shouldStick ? "visible" : ""}
            />
          </div>
        )}
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
