// import React, { Component } from 'react';
// import withAuth from './../components/withAuth';
// import API from './../utils/API';
// import './styles/Profile.css';
// import { Link, Route, Switch, withRouter } from 'react-router-dom';

//hook 
// const Settings = ({username, email, handleChange}) => (
//   <>
//     <h2>Public Profile</h2>
//     <div className="form-container">
//       <form>
//         <label>User Name</label>
//         <input
//           value={username}
//           onChange={handleChange}
//           name="username"
//           type="text"
//           id="username"
//         />
//         <label>Email </label>
//         <input value={email} />
//         <label>Update Password</label>
//         <input
//           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//           name="password"
//           type="password"
//           id="pwd"
//         />
//         <label>Verify Update Password </label>
//         <input
//           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//           name="password"
//           type="password"
//           id="pwd"
//         />
//         <button type="submit" className="btn btn-success">Submit</button>
//       </form>
//     </div>
//   </>
// );

// const Stats = ({currentStreak, longestStreak, totalWorkouts}) => (
//   <>
//     <h2>Public Profile</h2>
//     <div className="form-container">
//       <div>Current Streak: {currentStreak > 1 || currentStreak === 0 ? `${currentStreak} days` : `${currentStreak} day`}</div>
//       <div>Longest Streak: {longestStreak > 1 || longestStreak === 0 ? `${longestStreak} days` : `${longestStreak} day`}</div>
//       <div>Total Workouts: {totalWorkouts > 1 || totalWorkouts === 0 ? `${totalWorkouts} days` : `${totalWorkouts} day`}</div>
//     </div>
//   </>
// )

// function Profile(props) {
//   // create state and updater
//   const [state, setState] = useState({ 
//     username: "", 
//     email: "",  
//     currentStreak: 0,
//     longestStreak: 0,
//     totalWorkouts: 0,
//   });

//   // essentially componentDidMount. useEffect takes two arguments, a callback
//   // and dependencies. Whenever the dependencies change, it will call the callback
//   // since we pass no dependencies, it only calls it on mount
//   useEffect(() => {
//     API.getUser(props.user.id).then(res => {
//       setState({
//         username: res.data.username,
//         email: res.data.email,
//         longestStreak: res.data.currentStreak,
//         longestStreak: res.data.longestStreak,
//         totalWorkouts: res.data.totalWorkouts
//       })
//     });
//   }, [])

//   // Out handler uses `useCallback` so that react knows not to regenerate this function every render
//   const handleChange = useCallback(
//     event => {
//       const { name, value } = event.target;
//       setState(currentState => ({
//         ...currentState,
//         [name]: value
//       }))
//     },
//     [],
//   )

//   const routeToSettings = useCallback(
//     () => {
//       props.history.push("/profile/settings")
//     },
//     [props.history],
//   )

//   const routeToStats = useCallback(
//     () => {
//       props.history.push("/profile/stats")
//     },
//     [props.history],
//   )

//   return (
//     <div className="container-profile">
//       <div className="settings-container">
//         <div className="settings settings-header">
//           <h5>Personal Settings</h5>
//         </div>
//         <div className="settings settings-profile">
//           <h5 onClick={routeToSettings}>Profile</h5>
//         </div>
//         <div className="settings settings-delete">
//           <h5>Delete Account</h5>
//         </div>
//         <div className="settings settings-stats">
//           <h5 onClick={routeToStats}>Profile Stats</h5>
//         </div>
//       </div>
//       <div className="title">
//         <Switch>
//           <Route exact path="/profile/stats">
//             <Stats currentStreak={state.currentStreak} longestStreak={state.longestStreak} totalWorkouts={state.totalWorkouts} />
//           </Route>
//           <Route>
//             <Settings username={state.username} email={state.email} handleChange={handleChange}/>
//           </Route>
//         </Switch>
//       </div>
//     </div>
//   )
// }

// export default withRouter(withAuth(Profile));

// <p>Username: {this.state.username}</p>
// <p>Email: {this.state.email}</p>


// class 

// import React, { Component } from 'react';
// import withAuth from './../components/withAuth';
// import API from './../utils/API';
// import './styles/Profile.css';
// import { Link, Route, Switch, withRouter } from 'react-router-dom';


// const Settings = ({username, email, handleChange}) => (
//   <>
//     <h2>Public Profile</h2>
//     <div className="form-container">
//       <form>
//         <label>User Name</label>
//         <input
//           value={username}
//           onChange={handleChange}
//           name="username"
//           type="text"
//           id="username"
//         />
//         <label>Email </label>
//         <input value={email} />
//         <label>Update Password</label>
//         <input
//           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//           name="password"
//           type="password"
//           id="pwd"
//         />
//         <label>Verify Update Password </label>
//         <input
//           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//           name="password"
//           type="password"
//           id="pwd"
//         />
//         <button type="submit" className="btn btn-success">Submit</button>
//       </form>
//     </div>
//   </>
// )

// class ProfileSettings extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       username: "",
//       email: ""
//     }

//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     API.getUser(this.props.user.id).then(res => {
//       this.setState({
//         username: res.data.username,
//         email: res.data.email
//       })
//     });
//   }

//   handleChange(event) {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   }

//   render() {
//     const { username, email, } = this.state;

//     return (
//       <div className="container-profile">
//         <div className="settings-container">
//           <div className="settings settings-header">
//             <h5>Personal Settings</h5>
//           </div>
//           <div className="settings settings-profile">
//             <h5 onClick={() => this.props.history.push("/profile/settings")}>Profile</h5>
//           </div>
//           <div className="settings settings-delete">
//             <h5>Delete Account</h5>
//           </div>
//           <div className="settings settings-stats">
//             <h5 onClick={() => this.props.history.push("/profile/stats")}>Profile Stats</h5>
//           </div>
//         </div>
//         <div className="title">
//           <Switch>
//             <Route exact path="/profile/stats">
//               <div>Stats Page</div>
//             </Route>
//             <Route>
//               <Settings username={username} email={email} handleChange={this.handleChange}/>
//             </Route>
//           </Switch>
//         </div>
//       </div>
//     )
//   }
// }

// export default withRouter(withAuth(ProfileSettings));

// <p>Username: {this.state.username}</p>
// <p>Email: {this.state.email}</p>