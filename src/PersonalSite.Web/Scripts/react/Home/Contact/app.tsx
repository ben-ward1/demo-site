import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Modal } from "react-bootstrap";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "../../shared/LayoutStyledComponents";
import "../../../../Content/styles/app-style.scss";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import ChatComponent from "../../Chat/ChatComponent";

library.add(faGithub, faLinkedin, faEnvelope, faPhoneAlt);

axios.defaults.baseURL = BuildBaseUrl();

const downloadResume = () => {
  axios({ url: "Downloads/Resume", method: "GET", responseType: "blob" }).then(
    (response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        const blob = new Blob([response.data]);
        window.navigator.msSaveOrOpenBlob(blob, "wardResume2020-full.pdf");
      } else {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "wardResume2020-full.pdf");
        document.body.appendChild(link);
        link.click();
      }
    }
  );
};

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

const getScale = () => {
  const width = window.innerWidth;

  switch (true) {
    case width > 1199:
      return 1.5;
    case width > 991:
      return 1.3;
    case width > 767:
      return 1;
    case width > 575:
      return 0.7;
    default:
      return 0.5;
  }
};

interface IProps {
  captcha: string;
}

interface IState {
  showModal: boolean;
  numPages: number;
  scale: number;
}

class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      numPages: 0,
      scale: getScale(),
    };

    this.handleShowModal = this.handleShowModal.bind(this);

    window.addEventListener("resize", () => {
      this.setState({ scale: getScale() });
    });
  }

  handleShowModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { showModal, numPages, scale } = this.state;
    const { captcha } = this.props;

    return (
      <>
        <Layout>
          <h2 className="page-header">Contact Me.</h2>
          <div className="contact-page-content">
            <div className="contact-info-container">
              {contactItems.map((x, index) => (
                <div key={index} className="contact-item">
                  <FontAwesomeIcon color={x.color || "black"} icon={x.icon} />
                  <a href={x.link}>{x.text}</a>
                </div>
              ))}
            </div>
            <div className="resume-controls-container">
              <Button
                className="primary-button"
                onClick={this.handleShowModal}
                variant="light"
              >
                See my resume
              </Button>
              <Button
                className="primary-button"
                onClick={downloadResume}
                variant="light"
              >
                Download my resume
              </Button>
            </div>
          </div>
          <Modal
            className="resume-modal"
            show={showModal}
            onHide={this.handleShowModal}
          >
            <Document
              file="../../../../Content/pdf/wardResume2020-full.pdf"
              onLoadSuccess={this.onDocumentLoadSuccess}
              renderAnnotationLayer={false}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={scale}
                />
              ))}
            </Document>
            <Button
              className="primary-button"
              onClick={this.handleShowModal}
              variant="light"
            >
              Close
            </Button>
          </Modal>
        </Layout>
        {captcha && <ChatComponent captcha={captcha} />}
      </>
    );
  }
}

ReactDOM.render(<App {...window.MODEL} />, document.getElementById("app"));
