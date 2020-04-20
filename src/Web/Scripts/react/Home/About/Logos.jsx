import React from "react";

const path = "../../../Content/svg/";

const logos = [
  { file: "react-logo.svg", title: "React" },
  { file: "js-logo.svg", title: "Javascript" },
  { file: "babel-logo.svg", title: "Babel" },
  { file: "sass-logo.svg", title: "Sass" },
  { file: "webpack-logo.svg", title: "Webpack" },
  { file: "npm-logo.svg", title: "Node Package Manager" },
  { file: "bootstrap-logo.svg", title: "Bootstrap" },
  { file: "c-sharp-logo.svg", title: "C#" },
  { file: "dot-net-logo.svg", title: ".Net" },
  { file: "sql-server-logo.svg", title: "SQL Server" },
];

class Logos extends React.Component {
  constructor() {
    super();

    this.BuildPath = this.BuildPath.bind(this);
  }

  BuildPath(fileName) {
    return path + fileName;
  }

  render() {
    return (
      <div className="logos-container">
        {logos.map((l, index) => (
          <img
            key={index}
            className="tech-logo-img"
            src={this.BuildPath(l.file)}
            title={l.title}
          />
        ))}
      </div>
    );
  }
}

export default Logos;
