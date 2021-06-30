import React, { Component } from 'react';
import AccountBalance from './AccountBalance.js';
    
class Home extends Component {
  render() {
    return (
        <div id="home">
          <h1>Bank of React</h1>
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;
