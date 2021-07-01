import React, { Component } from 'react';
import AccountBalance from './AccountBalance.js';
import { Link } from 'react-router-dom';
    
class Home extends Component {
  render() {
    return (
        <div id="home">
          <h1>Bank of React</h1>
          {
            this.props.loggedIn 
            ?
              <div id="user-account">
                <Link to={"/user/" + this.props.userName}>User Profile</Link>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <Link to={"/user/" + this.props.userName + "/credits"}>Credits</Link>
                <Link to={"/user/" + this.props.userName + "/debits"}>Debits</Link>
              </div> 
            :
              <div>
                <Link to={"/login"}>Log In</Link>
              </div>
          }
        </div>
    );
  }
}

export default Home;
