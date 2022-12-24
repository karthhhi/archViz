import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Forms from "./components/Forms";
import Graph from "./components/Graph";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <br />
        <Switch>
          <Route exact path="/">
            <Graph />
          </Route>
          <Route path="/form">
            <Forms />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
