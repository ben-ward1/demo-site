import * as React from "react";

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
  { file: "aws-logo.svg", title: "Amazon Web Services" },
];

class Logos extends React.Component<{}, any> {
  constructor(props) {
    super(props);

    this.BuildPath = this.BuildPath.bind(this);
  }

  BuildPath(fileName) {
    return path + fileName;
  }

  render() {
    const breakPoint = Math.floor(logos.length / 2);

    return (
      <div className="logos-container">
        {logos.map((l, index) => (
          <React.Fragment key={index}>
            <img
              className="tech-logo-img"
              src={this.BuildPath(l.file)}
              title={l.title}
            />
            {index === breakPoint && <div className="flex-break" />}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Logos;
