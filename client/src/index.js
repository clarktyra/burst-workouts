import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './pages/Login';
import Settings from './pages/Settings';
import Leaderboard from './pages/Leaderboard';
import Signup from './pages/Signup';
import Navibar from './components/Navbar';
import Home from './pages/Home';
import Workout from './pages/Workout';
import Landing from './pages/Landing';
import Feedback from './pages/Feedback';

// Here is if we have an id_token in localStorage
if (localStorage.getItem("id_token")) {
	// then we will attach it to the headers of each request from react application via axios
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
    <Router>
        <div>
            <Navibar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/workout" component={Workout} />
            <Route exact path="/feedback" component={Feedback} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
