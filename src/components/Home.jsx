import React, { Component } from 'react';
import AccountBalance from './AccountBalance.jsx';
import { Redirect } from 'react-router-dom';
import "./Home.css";
import moneyBag from '../money_bag.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: ''
    }
  }

  handleClick = (event) => {
    this.setState({
      redirect: event.target.name
    })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={"/CSCI-39548-Summer2021-Assignment04/" + this.state.redirect}/>);
    }
    return (
        <div id="home">
          <h1>Bank of React</h1>
          <img id="money-bag" src={moneyBag}/>
          {
            this.props.loggedIn 
            ?
              <div id="user-account">
                <h1>Welcome Back {this.props.userName}!</h1>
                <button name={"user/" + this.props.userName} onClick={this.handleClick}>User Profile</button>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <div id="summaries">
                  <button name={"user/" + this.props.userName + "/credits"} onClick={this.handleClick}>Credits</button>
                  <button name={"user/" + this.props.userName + "/debits"} onClick={this.handleClick}>Debits</button>
                </div>
              </div> 
            :
              <div>
                <button id="login-button" name="login" onClick={this.handleClick}>Log In</button>
              </div>
          }
        </div>
    );
  }
}

export default Home;
