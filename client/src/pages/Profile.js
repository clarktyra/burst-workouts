import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import './styles/Profile.css';
import { Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }

  render() {
    return (
      <div className="container-profile">
        <div className="settings-container">
          <div className="settings-header">
            <h5>Personal Settings</h5>
          </div>
        </div>
        <div className="title">
          <h2>Public Profile</h2>
          {/* <p>Username: {this.state.username}</p>
          <p>Email: {this.state.email}</p> */}
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);
