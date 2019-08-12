import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import { Link } from 'react-router-dom';

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      users: []
    }

  }

  componentDidMount() {
    let currentCounter = 1;
    let longestCounter = 4;
    let currentStreak = `${currentCounter} day`;
    let longestStreak = `${longestCounter} days`;
    API.getUsers(this.props.users)
      .then(res => {
        let callUsers = res.data;
        callUsers.map(addToUser => {
          return Object.assign(addToUser, { longestStreak, currentStreak })
        })
        this.setState({
          users: callUsers
        })
      })
  }

  render() {
    const { users } = this.state;
    console.log('render', users);
    return (
      <div className="leaderboard-container">
        <Link to="/">Go Home</Link>
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Current Streak</th>
              <th>Longest Streak</th>
            </tr>
            <tr>
              <td>Bob</td>
              <td>2 days</td>
              <td>5 days</td>
            </tr>
            {
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.currentStreak}</td>
                  <td>{user.longestStreak}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default withAuth(Leaderboard);
