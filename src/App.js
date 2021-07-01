import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import UserProfile from './components/UserProfile.js';
import LogIn from './components/LogIn.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: '',
        memberSince: '07/01/1990',
        loggedIn: false
      },
      debits: [],
      credits: []
    };
  };

  fetchDebits = async () => {
    try {
      await fetch("https://moj-api.herokuapp.com/debits").then(res => {
        return res.json();
      }).then(debitsArray => {
        this.setState({debits: debitsArray});
        console.log(this.state.debits);
      });
    }
    catch(error) {
      console.log(error);
    }
  };

  fetchCredits = async () => {
    try {
      await fetch("https://moj-api.herokuapp.com/credits").then(res => {
        return res.json();
      }).then(creditsArray => {
        this.setState({credits: creditsArray});
        console.log(this.state.credits);
      });
    }
    catch(error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchCredits();
    this.fetchDebits();
  }

  mockLogIn = (logInInfo) => {
    let newUser = {...this.state.currentUser};
    newUser.loggedIn = true;
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
  }

  render() {
    const HomeComponent = () => (
      <Home 
        accountBalance={this.state.accountBalance} 
        userName={this.state.currentUser.userName} 
        loggedIn={this.state.currentUser.loggedIn}/>);
    const UserProfileComponent = () => (
      <UserProfile 
        userName={this.state.currentUser.userName} 
        memberSince={this.state.currentUser.memberSince}/>);
    const LogInComponent = () => (
      <LogIn 
        user={this.state.currentUser} 
        mockLogIn={this.mockLogIn} />);
    
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path={"/user/" + this.state.currentUser.userName} render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
        </Switch>
      </Router>
    );
  }
}


export default App;
