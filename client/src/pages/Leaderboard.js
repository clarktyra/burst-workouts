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
      users: [],
      reverse: false
    }

    this.compareBy = this.compareBy.bind(this);
    this.toggleReverse = this.toggleReverse.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    API.getUsers(this.props.users)
      .then(res => {
        let callUsers = res.data;
        this.setState({ users: callUsers })
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

  compareBy(key, ca) {

    if (ca === 'asc') {
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      }
    }
    if (ca === 'desc') {
      return function (a, b) {
        // console.log('desc case', a)
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      }
    }
  }

  sortBy(key, ca) {
    // console.log('the key is', key)
    // console.log('the case is', ca)
    let arrayCopy = [...this.state.users];
    arrayCopy.sort(this.compareBy(key, ca));
    this.toggleReverse()
    this.setState({ users: arrayCopy });
  }

  toggleReverse() {
    this.setState({ reverse: !this.state.reverse });
  }


  render() {

    const { users, username, currentStreak, longestStreak, totalWorkouts, reverse } = this.state;

    const rows = users.map(rowUser =>
      <tr key={rowUser._id}>
        <td>{rowUser.username}</td>
        <td>{rowUser.currentStreak}</td>
        <td>{rowUser.longestStreak}</td>
        <td>{rowUser.totalWorkouts}</td>
      </tr>
    );

    return (
      <div className="leaderboard-container">
        <table>
          <tbody>
            <tr>
              {!reverse ? <th onClick={() => this.sortBy('username', 'asc')} >User Name</th>
                :
                <th onClick={() => this.sortBy('username', 'desc')} >User Name</th>}
              {!reverse ? <th onClick={() => this.sortBy('currentStreak', 'asc')}>Current Streak</th>
                :
                <th onClick={() => this.sortBy('currentStreak', 'desc')}>Current Streak</th>}
              {!reverse ? <th onClick={() => this.sortBy('longestStreak', 'asc')}>Longest Streak</th>
                :
                <th onClick={() => this.sortBy('longestStreak', 'desc')}>Longest Streak</th>}
              {!reverse ? <th onClick={() => this.sortBy('totalWorkouts', 'asc')}>Total Workouts</th>
                :
                <th onClick={() => this.sortBy('totalWorkouts', 'desc')}>Total Workouts</th>}
            </tr>
            {rows}
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
