import * as React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { AboutTechInfoObject } from "../../../aboutHelperFunctions";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../Content/styles/app-style.scss";

library.add(faCaretRight);

const techInfo = AboutTechInfoObject;

class TechAccordion extends React.Component<{}, any> {
  constructor(props) {
    super(props);

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
                <div
                  className="caret-container-wrapper"
                  style={{ float: "right" }}
                >
                  <div className="caret-container">
                    <FontAwesomeIcon
                      className={`caret ${
                        index === this.state.selected ? "open" : "closed"
                      }`}
                      icon={faCaretRight}
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
    );
  }
}

export default TechAccordion;
