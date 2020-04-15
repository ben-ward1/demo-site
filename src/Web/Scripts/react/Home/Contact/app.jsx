import React from "react";
import ReactDOM from "react-dom";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  }

  render() {
    return (
      <div>
        <div className="contact-info-container">
          {contactItems.map((x, index) => (
            <div key={index} className="contact-item">
              <FontAwesomeIcon color={x.color || "black"} icon={x.icon} />
              <a href={x.link}>{x.text}</a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
