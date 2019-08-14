import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import AuthService from './../components/AuthService';
// import API from './../utils/API';
import './Workout.css';
import Timer from 'react-compound-timer';
import workoutImg from '../images/workout-image.jpg'

class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false
        }

        this.handleButton = this.handleButton.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
    }

    handleButton() {
        this.setState({
            isRunning: !this.state.isRunning
        })
    }

    handleEnd() {
        alert('finished');
    }

    render() {
        return (
            <div className='workout-page-container'>
                <div className='workout-page-card'>
                <h1 className='workout-page-head'>PUSH-UPS</h1>
                    <img className='workout-image' src={workoutImg} alt='Push-up img'/>
                    <p style={{marginTop: '50px'}} ><strong>Targets:</strong> Chest, arms, shoulders, core</p>
                    <p><strong>Description: </strong><br /><br /> An exercise in which a person lying face down, with the hands under the shoulders, 
                        raises the torso and, often, the knees off the ground by pushing down with the palms: 
                        push-ups are usually done in a series by alternately straightening and bending the arms.</p>
                    <Timer 
                        initialTime={5000} 
                        direction='backward' 
                        startImmediately={false}  
                        onStart={this.handleButton} 
                        onStop={this.handleButton}
                        checkpoints={
                            [{
                                time: 0,
                                callback: this.handleEnd
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

export default Workout;
