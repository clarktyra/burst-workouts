import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import './styles/Leaderboard.css';
import API from './../utils/API';

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      currentStreak: 0,
      longestStreak: 0,
      totalWorkouts: 0,
      users: []
    }

  }

  componentDidMount() {
    API.getUsers(this.props.users)
      .then(res => {
        let callUsers = res.data;
        this.setState({
          users: callUsers
        })
      })
    API.getUser(this.props.user.id)
      .then(res1 => {
        this.setState({
          username: res1.data.username,
          currentStreak: res1.data.currentStreak,
          longestStreak: res1.data.longestStreak,
          totalWorkouts: res1.data.totalWorkouts
        })
      })
      .catch(err => err);
  }

  render() {
    const { users, username, currentStreak, longestStreak, totalWorkouts } = this.state;
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
                  <td>{user.totalWorkouts > 1 || user.totalWorkouts === 0 ? `${user.totalWorkouts} days` : `${user.totalWorkouts} day`}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="user-container">
          <img src={require('../images/squat-image.jpg')} alt='profile' />
          <div>Welcome: {username}</div>
          <div>Current Streak: {currentStreak > 1 || currentStreak === 0 ? `${currentStreak} days` : `${currentStreak} day`}</div>
          <div>Longest Streak: {longestStreak > 1 || longestStreak === 0 ? `${longestStreak} days` : `${longestStreak} day`}</div>
          <div>Total Workouts: {totalWorkouts > 1 || totalWorkouts === 0 ? `${totalWorkouts} days` : `${totalWorkouts} day`}</div>
          <Link to='/workout'><button>Work Out Now</button></Link>
        </div>
      </div>
    )
  }
};

export default withAuth(Leaderboard);
