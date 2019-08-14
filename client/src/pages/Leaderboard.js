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
    let currentCounter = 0;
    let longestCounter = 10;
    let currentStreak;
    let longestStreak;
    API.getUsers(this.props.users)
      .then(res => {
        let callUsers = res.data;
        callUsers.map(addToUser => {
          return Object.assign(
            addToUser,
            { longestStreak: this.randomStreak(longestCounter), currentStreak: this.incrementer(currentCounter) }
          )
        })
        this.setState({
          users: callUsers
        })
      })
  }

  render() {
    const { users } = this.state;
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
};

export default withAuth(Leaderboard);
