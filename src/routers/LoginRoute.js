import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import LoginPage from '../pages/login';

class HomeRoute extends React.Component {
  render() {
    return (
      <div>
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route component={LoginPage} />
            <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    );
  }
}

export default HomeRoute