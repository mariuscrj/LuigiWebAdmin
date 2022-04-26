import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import HomePage from '../pages/index';
import ErrorPage from '../pages/error';
import UsersPage from '../pages/users';
import FacultyPage from '../pages/faculties';
import CoursesPage from '../pages/courses';
import HistoriesPage from '../pages/histories';

class HomeRoute extends React.Component {
  render() {

    return (
      <div>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/faculties" component={FacultyPage} />
            <Route exact path="/courses" component={CoursesPage} />
            <Route exact path="/histories" component={HistoriesPage} />
            <Route component={ErrorPage} />
            <Redirect exact from="/" to="/error" />
        </Switch>
      </div>
    );
  }
}

export default HomeRoute