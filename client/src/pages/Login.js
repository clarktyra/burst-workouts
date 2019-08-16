import React, { Component } from 'react';
import AuthService from './../components/AuthService';
import { Link } from 'react-router-dom';
import workoutImg from '../images/workout-image.jpg'
import './Login.css';


const imgStyle = {
  width: "100%"
}
class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/home');

    }
  }

  handleFormSubmit = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        // once user is logged in
        // take them to their profile page
        //this.props.history.replace(`/home`);
        window.location.reload();


      })
      .catch(err => {
        alert(err.response.data.message)
      });
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
        <div className="container col-md-6">
          <div className="headers">
            <h1>WELCOME BACK </h1>
            <h3>LOGIN AND CONTINUE YOUR STREAK</h3>
          </div>
          <form onSubmit={this.handleFormSubmit}>
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
            <button type="submit" className="btn btn-danger">Login</button>
          </form>
        </div>
      </div>
      <br></br>
        <div className="row">
          <div className="container col-md-6 ">
            <img style={imgStyle} src={workoutImg} />
          </div>
        </div>
        </div>

    );
  }
}

export default Login;
