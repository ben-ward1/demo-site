import React from "react";
import ReactDOM from "react-dom";
import { Accordion, Card, Button } from "react-bootstrap";
import { BuildAboutTechInfoObject } from "../../../aboutHelperFunctions";
import Logos from "./Logos";
import "../../../../Content/styles/app-style.scss";

const techInfo = BuildAboutTechInfoObject();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(index) {
    this.setState({
      selected: index === this.state.selected ? null : index,
    });
  }

  render() {
    return (
      <div>
        <Logos />
        <Accordion>
          {techInfo.map((x, index) => (
            <div className="card-container" key={index}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={index.toString()}
                  onClick={() => this.handleSelect(index)}
                >
                  {x.title}
                  <div className="caret-container-wrapper pull-right">
                    <div className="caret-container">
                      <span
                        className={`caret ${
                          index === this.state.selected ? "open" : "closed"
                        }`}
                      />
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index.toString()}>
                <React.Fragment>
                  {x.items.map((y, index) => (
                    <div className="tech-item-container" key={index}>
                      <strong>{y.title}: </strong>
                      <span>{y.description}</span>
                    </div>
                  ))}
                </React.Fragment>
              </Accordion.Collapse>
            </div>
          ))}
        </Accordion>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
