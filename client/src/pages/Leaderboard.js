import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import './styles/Leaderboard.css';
import API from './../utils/API';

function Leaderboard(props) {

  const [state, setState] = useState({
    username: "",
    currentStreak: 0,
    longestStreak: 0,
    totalWorkouts: 0,
    users: [],
    reverse: false
  });

  useEffect(() => {
    API.getUsers(props.users)
      .then(res => {
        let callUsers = res.data;
        setState({ users: callUsers })
      })
    API.getUser(props.user.id)
      .then(res1 => {
        setState(currentState => ({
          ...currentState,
          username: res1.data.username,
          currentStreak: res1.data.currentStreak,
          longestStreak: res1.data.longestStreak,
          totalWorkouts: res1.data.totalWorkouts
        }))
      })
      .catch(err => err);
  }, [props.users, props.user.id]);

  const compareBy = useCallback(
    (key, ca) => {
      if (ca === 'asc') {
        return function (a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        }
      }
      if (ca === 'desc') {
        return function (a, b) {
          if (a[key] < b[key]) return 1;
          if (a[key] > b[key]) return -1;
          return 0;
        }
      }
    },
    [],
  )

  const toggleReverse = useCallback(
    () => {
      setState(currentState => ({
        ...currentState,
        reverse: !state.reverse
      }))
    },
    [state.reverse],
  )

  const sortBy = useCallback(
    (key, ca) => {
      let arrayCopy = [...state.users];
      arrayCopy.sort(compareBy(key, ca));
      toggleReverse()
      setState(currentState => ({
        ...currentState,
        users: arrayCopy
      }))
    },
    [state.users, compareBy, toggleReverse],
  )

  const { users } = state;

  const rows = users.map(rowUser =>
    <tr key={rowUser._id}>
      <td>{rowUser.username}</td>
      <td>{rowUser.currentStreak}</td>
      <td>{rowUser.longestStreak}</td>
      <td>{rowUser.totalWorkouts}</td>
    </tr>
  );

  const { reverse, username, currentStreak, longestStreak, totalWorkouts } = state;

  return (
    <div className="leaderboard-container">
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              {!reverse ?
                <th onClick={() => sortBy('username', 'asc')} >User Name</th>
                :
                <th onClick={() => sortBy('username', 'desc')} >User Name</th>
              }
              {!reverse ?
                <th onClick={() => sortBy('currentStreak', 'asc')}>Current Streak</th>
                :
                <th onClick={() => sortBy('currentStreak', 'desc')}>Current Streak</th>
              }
              {!reverse ?
                <th onClick={() => sortBy('longestStreak', 'asc')}>Longest Streak</th>
                :
                <th onClick={() => sortBy('longestStreak', 'desc')}>Longest Streak</th>
              }
              {!reverse ?
                <th onClick={() => sortBy('totalWorkouts', 'asc')}>Total Workouts</th>
                :
                <th onClick={() => sortBy('totalWorkouts', 'desc')}>Total Workouts</th>
              }
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
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

export default withAuth(Leaderboard);
