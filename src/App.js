import React from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import { auth } from "./firebase";
import HomeRoute from "./routers/HomeRoute";
import LoginRoute from "./routers/LoginRoute";
import "./css/loading.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      this.setState({ 
        user: userAuth,
        isLoading: false
      });
    });
  };

  componentWillUnmount() {
    this.setState({
      user: null,
      isLoading: true
    })
  }

  render() {

    let Routing;
    if(!this.state.isLoading) {
      if (this.state.user !== null) {
        Routing = <HomeRoute/>;
      } else {
        Routing = <LoginRoute/>;
      }
  
      return <BrowserRouter>{Routing}</BrowserRouter>;
    } else {
      return <h1 className="loading">Loading...</h1>
    }

  }
}

export default App