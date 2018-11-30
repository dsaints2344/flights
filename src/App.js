import React, { Component } from 'react';
import Login from './components/login'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import {Profile} from './components/profile';
import Reservations from './components/reservations';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      newUserState: null
    }
  }

  onChangeUserSate = (newState) => {
    this.setState({
      newUserState: newState
    })
  }
  render() {
    return (
      <Router>
        <div>
          {this.state.newUserState !== null ?<Redirect from="/" to="/profile" />:<Login newUserState={this.state.newUserState} changeState={this.onChangeUserSate.bind(this)}/> }

          
          <Route exact path="/" component={Login}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/reservations" component={Reservations}/>
        </div>
      </Router>
      
    );
  }
}

export default App;
