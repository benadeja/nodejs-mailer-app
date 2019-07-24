import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  componentDidMount() {
    //This is call on App startup, only once
    this.props.fetchUser();
  }

  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Header>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
