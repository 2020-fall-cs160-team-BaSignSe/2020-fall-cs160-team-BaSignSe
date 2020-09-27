import React, { Component } from "react";
import AppNavbar from "./components/AppNavBar";
import List from "./components/List";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <List />
        </div>
      </Provider>
    );
  }
}

export default App;
