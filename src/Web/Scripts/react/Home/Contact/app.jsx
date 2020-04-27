import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "../../shared/LayoutStyledComponents";
import "../../../../Content/styles/app-style.scss";

library.add(faGithub, faLinkedin, faEnvelope, faPhoneAlt);

const contactItems = [
  {
    icon: faEnvelope,
    link: "mailto:benjamin.e.ward@outlook.com",
    text: "benjamin.e.ward@outlook.com",
  },
  {
    icon: faPhoneAlt,
    link: "tel:1-256-566-5467",
    text: "(256) 566-5467",
  },
  {
    icon: faGithub,
    link: "https://github.com/BenjaminEllisWard",
    text: "github.com/BenjaminEllisWard",
  },
  {
    icon: faLinkedin,
    link: "https://linkedin.com/in/benjamineward",
    text: "linkedin.com/in/benjamineward",
    color: "#0077b5",
  },
];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleShowModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    return (
      <Layout>
        <h2 class="page-header">Contact Me.</h2>
        <div className="contact-info-container">
          {contactItems.map((x, index) => (
            <div key={index} className="contact-item">
              <FontAwesomeIcon color={x.color || "black"} icon={x.icon} />
              <a href={x.link}>{x.text}</a>
            </div>
          ))}
        </div>
        <Button
          className="primary-button"
          onClick={this.handleShowModal}
          variant="light"
        >
          See my resume
        </Button>
        <Modal
          className="resume-modal"
          size="lg"
          show={this.state.showModal}
          onHide={this.handleShowModal}
        >
          <img
            className="resume-modal-img"
            src="../../../../Content/img/resume.jpg"
          />
        </Modal>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
