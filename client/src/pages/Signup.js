import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './../components/AuthService';
import API from './../utils/API';
import './Signup.css';

import workoutImg from '../images/workout-image.jpg'
import jumpropeImg from '../images/with-jump-rope.jpg'


const imgStyle = {
  width: "100%"
}
class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.username, this.state.email, this.state.password)
      .then(res => {
        // once the user has signed up
        // send them to the login page
        this.props.history.replace('/login');
      })
      .catch(err => alert(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };



  render() {

    return (
      <div className="wrapper">
        <div className="row">
          <div className="container col-md-6 signup-container">
            <div className="headers">
              <h1>JOIN THE MOVEMENT </h1>
              <h3>SIGN UP NOW FOR FREE</h3>
            </div>

            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input className="form-control"
                  placeholder="Username goes here..."
                  name="username"
                  type="text"
                  id="username"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input className="form-control"
                  placeholder="Email goes here..."
                  name="email"
                  type="email"
                  id="email"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input className="form-control"
                  placeholder="Password goes here..."
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={this.handleChange} />
              </div>
              <button type="submit" className="btn btn-danger">Signup</button>
            </form>

          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="container col-md-6 ">
            <img style={imgStyle} src={jumpropeImg} />
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}

export default Signup;
