import React from "react";

import "../App.css";
import { AppStateType } from "../types";

export default class App extends React.PureComponent<{}, AppStateType>{
  render() {
    return (
      <div className="App">Hello</div>
    );
  }
}
