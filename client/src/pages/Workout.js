import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import { Link } from 'react-router-dom';
// import AuthService from './../components/AuthService';
import API from './../utils/API';
import './Workout.css';
import Timer from 'react-compound-timer';
import workoutImg from '../images/workout-image.jpg'

class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isOver: false,
            username: '',
            currentStreak: null,
            id: ''
        }

        this.handleButton = this.handleButton.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handlePopup = this.handlePopup.bind(this);
    }

    componentDidMount() {
        API.getUser(this.props.user.id)
        .then(res => {
            this.setState({
                username: res.data.username,
                currentStreak: res.data.currentStreak,
                id: res.data.username.id
            })
        })
    }

    handleButton() {
        this.setState({
            isRunning: !this.state.isRunning
        })
    }

    handleEnd() {
        API.updateCurrentStreak(this.props.user.id)
        .then(res => {
            this.setState({
                currentStreak: res.data.currentStreak
            })
        })
        .catch(err => {
            console.log(err, 'error fool!');
        })
    }

    handlePopup() {
        this.setState({
            isOver: !this.state.isOver
        })
    }

    render() {
        return (
            <div className='workout-page-container'>
            {
                this.state.isOver === true ?
                <div className='workout-pop-up'>
                    <div className='arc'>
                        <span>C</span>
                        <span>O</span>
                        <span>N</span>
                        <span>G</span>
                        <span>R</span>
                        <span>A</span>
                        <span>T</span>
                        <span>S</span>
                    </div>
                    <h2>Your workout is finished!</h2>
                    <p>Head to the leaderboard and see your current streak.</p>
                    <p><Link to="/leaderboard">Go to Leaderboard</Link></p>
                </div> :
                <div></div>
            }
                <div className='workout-page-card'>
                <h1 className='workout-page-head'>PUSH-UPS</h1>
                    <img className='workout-image' src={workoutImg} alt='Push-up img'/>
                    <p style={{marginTop: '50px'}} ><strong>Targets:</strong> Chest, arms, shoulders, core</p>
                    <p><strong>Description: </strong><br /><br /> An exercise in which a person lying face down, with the hands under the shoulders, 
                        raises the torso and, often, the knees off the ground by pushing down with the palms: 
                        push-ups are usually done in a series by alternately straightening and bending the arms.</p>
                    <Timer 
                        initialTime={2000} 
                        direction='backward' 
                        startImmediately={false}  
                        onStart={this.handleButton} 
                        onStop={this.handleButton}
                        checkpoints={
                            [{
                                time: 0,
                                callback: this.handleEnd
                            },
                            {
                                time: 0,
                                callback: this.handlePopup
                            }]
                        }
                    >
                        {({start, stop, timerState}) => (
                            <React.Fragment>
                                    <div 
                                        className='timer' 
                                        style={this.state.isRunning === false ? ({color: 'rgb(82, 82, 82)'}) : ({color: 'rgb(239, 239, 241)'})}
                                    >
                                        <Timer.Minutes />:
                                        <Timer.Seconds formatValue={(value) => value < 10 ? `0${value}` : value}/>
                                    </div>
                                <div className='botton-container'>
                                    {
                                        this.state.isRunning === false ? 
                                        <button onClick={start} className='button-start'>START YOUR WORKOUT</button> : 
                                        <button onClick={stop} className='button-stop'>STOP YOUR WORKOUT</button>
                                    }
                                </div>
                            </React.Fragment>
                            )
                        }
                    </Timer>
                </div>
            </div>
        )
    }
}

export default withAuth(Workout);
