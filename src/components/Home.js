import React, { Component } from 'react';
import AccountBalance from './AccountBalance.js';
import { Link, Redirect } from 'react-router-dom';
import "./Home.css";

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
      return (<Redirect to={"/" + this.state.redirect}/>);
    }
    return (
        <div id="home">
          <h1>Bank of React</h1>
          <img id="money-bag" src="/money_bag.svg"/>
          {
            this.props.loggedIn 
            ?
              <div id="user-account">
                <h1>Welcome Back {this.props.userName}!</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <Link to={"/user/" + this.props.userName}>User Profile</Link>
                <Link to={"/user/" + this.props.userName + "/credits"}>Credits</Link>
                <Link to={"/user/" + this.props.userName + "/debits"}>Debits</Link>
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
