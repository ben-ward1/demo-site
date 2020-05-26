import * as React from "react";
import * as ReactDOM from "react-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { Dispatch } from "react";
import { SetName, IAction } from "./actions";
import { IAppState, store } from "./store";
import AppComponent from "./AppComponent";

type blogItem = {
  title: string;
  content: string;
};

type modelType = {
  firstView: boolean;
  captcha: string;
  blog: Array<blogItem>;
};

declare global {
  interface Window {
    MODEL: modelType;
    Modernizr: any;
  }
}

export const mapStateToProps = () => {
  return {
    ...window.MODEL,
  };
};

export const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setName: (name: string) => dipatch(SetName(name)),
  };
};

const App = compose(connect(mapStateToProps, mapDispatchToProps))(AppComponent);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
