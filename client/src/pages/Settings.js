import React, { useState, useEffect, useCallback } from 'react';
import withAuth from '../components/withAuth';
import axios from 'axios';
import API from '../utils/API';
import './styles/Settings.css';
import { Route, Switch, withRouter, Link } from 'react-router-dom';


const Profile = ({username, email, handleChange}) => (
  <>
    <h2>Public Profile</h2>
    <div className="form-container">
      <form>
        <label>User Name</label>
        <input
          defaultValue={username}
          onChange={handleChange}
          name="username"
          type="text"
          id="username"
        />
        <label>Email </label>
        <input defaultValue={email} />
        <label>Update Password</label>
        <input
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          name="password"
          type="password"
          id="pwd"
        />
        <label>Verify Update Password </label>
        <input
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          name="password"
          type="password"
          id="pwd-second-input"
        />
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  </>
);

const Stats = ({currentStreak, longestStreak, totalWorkouts}) => (
  <>
    <h2>Profile Stats</h2>
    <div className="form-container">
      <div>Current Streak: {currentStreak > 1 || currentStreak === 0 ? `${currentStreak} days` : `${currentStreak} day`}</div>
      <div>Longest Streak: {longestStreak > 1 || longestStreak === 0 ? `${longestStreak} days` : `${longestStreak} day`}</div>
      <div>Total Workouts: {totalWorkouts > 1 || totalWorkouts === 0 ? `${totalWorkouts} days` : `${totalWorkouts} day`}</div>
    </div>
  </>
);

const DeleteProfile = ({ id, deleteAccount }) => (
  <>
    <h2>Delete Profile</h2>
    <div className="form-container">
      <div>Would you like to Delete your profile</div>
      <div>You will be missing out on competition with your friends</div>
      <Link to="/"><button onClick={deleteAccount}>Delete Account</button></Link>
    </div>
  </>
)


function Settings(props) {
  // create state and updater
  const [state, setState] = useState({ 
    username: "", 
    email: "", 
    id: "", 
    currentStreak: 0,
    longestStreak: 0,
    totalWorkouts: 0,
  });

  // essentially componentDidMount. useEffect takes two arguments, a callback
  // and dependencies. Whenever the dependencies change, it will call the callback
  // since we pass no dependencies, it only calls it on mount
  useEffect(() => {
    API.getUser(props.user.id).then(res => {
      setState({
        username: res.data.username,
        email: res.data.email,
        currentStreak: res.data.currentStreak,
        longestStreak: res.data.longestStreak,
        totalWorkouts: res.data.totalWorkouts,
        id: res.data._id,
        loggedIn: true
      })
    })
  }, [props.user.id]);

  // Out handler uses `useCallback` so that react knows not to regenerate this function every render
  const handleChange = useCallback(
    event => {
      const { name, value } = event.target;
      setState(currentState => ({
        ...currentState,
        [name]: value
      }))
    },
    [],
  )

  const routeToProfile = useCallback(
    () => {
      props.history.push("/settings/profile")
    },
    [props.history],
  )

  const routeToDeleteProfile = useCallback(
    () => {
      props.history.push("/settings/deleteprofile")
    },
    [props.history],
  )

  const routeToStats = useCallback(
    () => {
      props.history.push("/settings/stats")
    },
    [props.history],
  )

  const deleteAccount = useCallback(
    () => {
      API.deleteUser(props.user.id)
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.removeItem('id_token');
      // this will reload the page and reset the state of the application
      window.location.reload('/');
    },
    [props.user.id],
  )

  return (
    <div className="container-profile">
      <div className="settings-container">
        <div className="settings settings-header">
          <h4>Personal Settings</h4>
        </div>
        <div className="settings settings-profile">
          <h5 onClick={routeToProfile}>Profile</h5>
        </div>
        <div className="settings settings-stats">
          <h5 onClick={routeToStats}>Profile Stats</h5>
        </div>
        <div className="settings settings-delete">
          <h5 onClick={routeToDeleteProfile}>Delete Profile</h5>
        </div>
      </div>
      <div className="title">
        <Switch>
          <Route exact path="/settings/stats">
            <Stats currentStreak={state.currentStreak} longestStreak={state.longestStreak} totalWorkouts={state.totalWorkouts} />
          </Route>
          <Route exact path="/settings/deleteprofile">
            <DeleteProfile id={state.id} deleteAccount={deleteAccount} />
          </Route>
          <Route>
            <Profile username={state.username} email={state.email} handleChange={handleChange}/>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(withAuth(Settings));
