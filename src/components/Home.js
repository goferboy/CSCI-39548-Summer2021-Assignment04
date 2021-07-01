import React, { Component } from 'react';
import AccountBalance from './AccountBalance.js';
import { Link, Redirect } from 'react-router-dom';
    
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
                <button name="login" onClick={this.handleClick}>Log In</button>
              </div>
          }
        </div>
    );
  }
}

export default Home;
