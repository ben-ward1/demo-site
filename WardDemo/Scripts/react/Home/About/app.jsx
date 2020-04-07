import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Accordion, Card, Button } from "react-bootstrap";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import { BuildAboutTechInfoObject } from "../../../aboutHelperFunctions";
import "../../../../Content/styles/app-style.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = BuildBaseUrl();
  }

  buildTechInfoAccordion() {
    const techInfo = BuildAboutTechInfoObject();

    return (
      <Accordion>
        {techInfo.map((x, index) => (
          <div className="card-container" key={index}>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey={index.toString()}
              >
                {x.title}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
              <div>
                <br />
                {x.items.map((y, index) => (
                  <React.Fragment key={index}>
                    <strong>{y.title}: </strong>
                    <span>{y.description}</span>
                    <br />
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </Accordion.Collapse>
          </div>
        ))}
      </Accordion>
    );
  }

  render() {
    return this.buildTechInfoAccordion();
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
