import React, { Component } from 'react';
import AccountBalance from './AccountBalance.js';
import { Link } from 'react-router-dom';
    
class Home extends Component {
  render() {
    return (
        <div id="home">
          <h1>Bank of React</h1>
          <Link to={"/user/" + this.props.userName}>User Profile</Link>
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;
