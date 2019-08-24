import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import './styles/Leaderboard.css';
import API from './../utils/API';

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      currentStreak: null,
      users: []
    }

    this.incrementer = this.incrementer.bind(this);
    this.randomStreak = this.randomStreak.bind(this);
  }

  incrementer(count) {
    let numDays = count + 1;
    return numDays > 1 ? `${numDays} days` : `${numDays} day`;
  }

  randomStreak(count) {
    let numDays = Math.floor(Math.random() * Math.floor(count));
    return numDays >= 1 ? `${numDays} days` : `${numDays} day`
  }

  componentDidMount() {
    let longestCounter = 10;
    API.getUsers(this.props.users)
      .then(res => {
        let callUsers = res.data;
        callUsers.map(addToUser => {
          return Object.assign(
            addToUser,
            { longestStreak: this.randomStreak(longestCounter) }
          )
        })
        this.setState({
          users: callUsers
        })
      })
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        currentStreak: res.data.currentStreak
      })
    });
  }

  render() {
    const { users, username, currentStreak } = this.state;
    return (
      <div className="leaderboard-container">
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Current Streak</th>
              <th>Longest Streak</th>
            </tr>
            {
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.currentStreak > 1 || user.currentStreak === 0 ? `${user.currentStreak} days` : `${user.currentStreak} day`}</td>
                  <td>{user.longestStreak}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="user-container">
          <h3>Welcome: <br />{username}</h3>
          <h3>CurrentStreak: <br />{currentStreak > 1 || currentStreak === 0 ? `${currentStreak} days` : `${currentStreak} day`}</h3>
        </div>
      </div>
    )
  }
};

export default withAuth(Leaderboard);
