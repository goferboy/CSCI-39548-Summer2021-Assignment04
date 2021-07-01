import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import UserProfile from './components/UserProfile.js';
import LogIn from './components/LogIn.js';
import Summary from './components/Summary.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0.0,
      currentUser: {
        userName: 'test',
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
        debitsArray.sort((a, b) => {
          return Date.parse(a.date) - Date.parse(b.date);
        });
        this.setState({debits: debitsArray});
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
        creditsArray.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });
        this.setState({credits: creditsArray});
      });
    }
    catch(error) {
      console.log(error);
    }
  };

  calculateBalance = async () => {
    const creditsTotal = this.state.credits.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0);
    const debitsTotal = this.state.debits.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0);
    // console.log(parseFloat(Number(creditsTotal).toFixed(2) - Number(debitsTotal).toFixed(2)).toFixed(2));
    this.setState({
      accountBalance: parseFloat(Number(creditsTotal).toFixed(2) - Number(debitsTotal).toFixed(2)).toFixed(2)
    });
    console.log(this.state.accountBalance);
  }

  componentDidMount() {
    this.fetchCredits();
    this.fetchDebits();
  }
  
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser};
    newUser.loggedIn = true;
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
    this.calculateBalance();
  }

  render() {
    const HomeComponent = () => (
      <Home 
        accountBalance={this.state.accountBalance}
        credits={this.state.credits}
        debits={this.state.debits} 
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
    const CreditsComponent = () => (
      <Summary
        sumType="Credits"
        accountBalance={this.state.accountBalance}
        userName={this.state.currentUser.userName} 
        summary={this.state.credits}/>);
    const DebitsComponent = () => (
      <Summary
        sumType="Debits"
        accountBalance={this.state.accountBalance}
        userName={this.state.currentUser.userName} 
        summary={this.state.debits}/>);
    return (
      <div>
      {/* <button onClick={(event) => {console.log(this.state.credits); console.log(this.state.debits); this.calculateBalance();}}>test</button> */}
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path={"/user/" + this.state.currentUser.userName} render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path={"/user/" + this.state.currentUser.userName + "/credits"} render={CreditsComponent}/>
          <Route exact path={"/user/" + this.state.currentUser.userName + "/debits"} render={DebitsComponent}/>
        </Switch>
      </Router>
      </div>
    )
  }
}


export default App;
