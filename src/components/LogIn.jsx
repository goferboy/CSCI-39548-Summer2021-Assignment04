import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./LogIn.css";

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //User object is used to store input values as they change
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  //by passing the event.target.name, allows handleChange listener to 
  //work on multiple input fields
  handleChange = (event) => {
    const updatedUser = {...this.state.user};
    const inputField = event.target.name;
    const inputValue = event.target.value;
    updatedUser[inputField] = inputValue;
    this.setState({user: updatedUser});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.mockLogIn(this.state.user);
    this.setState({redirect: true});
  }

  render () {
    if (this.state.redirect) {
      return (<Redirect to="/CSCI-39548-Summer2021-Assignment04/"/>)
    }

    return (
      <div>
        <h1>Bank of React</h1>
        <form id="login-form" onSubmit={this.handleSubmit}>
          <div className="form-entry">
            <label htmlFor="userName">Username: </label>
            <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
          </div>
          <div className="form-entry">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" />
          </div>
          <button id="login-submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LogIn;
