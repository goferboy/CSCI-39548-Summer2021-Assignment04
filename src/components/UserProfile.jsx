import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  handleClick = () => {
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/CSCI-39548-Summer2021-Assignment04/"/>);
    }
    return (
        <div>
          <h1>User Profile</h1>
          <h3>Username: {this.props.userName}</h3>
          <h3>Member Since: {this.props.memberSince}</h3>
          <button onClick={this.handleClick}>Return Home</button>
        </div>
    );
  }
}

export default UserProfile;
