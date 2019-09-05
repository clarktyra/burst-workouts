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
      longestStreak: null,
      users: []
    }

    // this.incrementer = this.incrementer.bind(this);
    // this.randomStreak = this.randomStreak.bind(this);
  }

  // incrementer(count) {
  //   let numDays = count + 1;
  //   return numDays > 1 ? `${numDays} days` : `${numDays} day`;
  // }

  // randomStreak(count) {
  //   let numDays = Math.floor(Math.random() * Math.floor(count));
  //   return numDays >= 1 ? `${numDays} days` : `${numDays} day`
  // }

  componentDidMount() {
    let longestCounter = 10;
    API.getUsers(this.props.users)
      .then(res => {
        let callUsers = res.data;
        this.setState({
          users: callUsers
        })
      })
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        currentStreak: res.data.currentStreak,
        longestStreak: res.data.longestStreak
      })
    });
  }

  render() {
    const { users, username, currentStreak, longestStreak } = this.state;
    return (
      <div className="leaderboard-container">
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Current Streak</th>
              <th>Longest Streak</th>
              <th>Total Workout</th>
            </tr>
            {
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.currentStreak > 1 || user.currentStreak === 0 ? `${user.currentStreak} days` : `${user.currentStreak} day`}</td>
                  <td>{user.longestStreak > 1 || user.longestStreak === 0 ? `${user.longestStreak} days` : `${user.longestStreak} day`}</td>
                  <td></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="user-container">
          <img src={require('../images/squat-image.jpg')} />
          <h3>Welcome: {username}</h3>
          <h3>Current Streak: {currentStreak > 1 || currentStreak === 0 ? `${currentStreak} days` : `${currentStreak} day`}</h3>
          <h3>Longest Streak: {longestStreak > 1 || longestStreak === 0 ? `${longestStreak} days` : `${longestStreak} day`}</h3>
          <h3>Total Workouts: </h3>
        </div>
      </div>
    )
  }
};

export default withAuth(Leaderboard);
