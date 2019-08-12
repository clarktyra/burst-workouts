import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './../components/AuthService';
import API from './../utils/API';
import Timer from 'react-compound-timer';

class Workout extends Component {

    render() {
        return (
            <div>
                <Timer initialTime={300000} direction='backward' startImmediately='true'>
                    {({start, stop, timerState}) => (
                        <React.Fragment>
                            <div>
                                <Timer.Minutes />:
                                <Timer.Seconds />
                            </div>
                        </React.Fragment>
                        )
                    }
                </Timer>
            </div>
        )
    }
}

export default Workout;