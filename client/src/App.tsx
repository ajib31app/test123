import { Component, useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Login from "./components/login.component";

import AuthService from "./services/auth.service";
import IUserData from "./types/user.type"



type Props = {};

type State = IUserData & {
  isLogged : boolean,
  user: any
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.checking = this.checking.bind(this); 

    this.state = {
      id: null,
      username: "",
      email: "",
      password: "",
      accessToken: "",
      isLogged: false,
      user: ""
    };
  }

  
  
  checking() { 
    console.log("checking");
    let user = AuthService.getCurrentUser();
    this.setState({
      user: user,
      isLogged: true
    });
    // console.log(">>>>>>>>"+JSON.stringify(user));
    
  }
  
  // if (user) {
  //   setCurrentUser(user);
  //   setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
  // }

  render() {
    
    const { user, isLogged } = this.state;
    console.log("isLogged "+isLogged);
    console.log("user  "+JSON.stringify(user));
    return (
      
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            test
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>

        </nav>

        <div className="container mt-3">
          <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
            <Route exact path={"/tutorials"} component={TutorialsList} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
