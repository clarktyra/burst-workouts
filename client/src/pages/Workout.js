import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import { Link } from 'react-router-dom';
import API from './../utils/API';
import './styles/Workout.css';
import Timer from 'react-compound-timer';
import { workouts } from '../utils/workout-data';
import moment from 'moment';

class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isOver: false,
            lastWorkout: '',
            username: '',
            id: '',
            todaysDate: moment().format('YYYY-MM-DD')
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
                    id: res.data.username.id,
                    lastWorkout: res.data.lastWorkout
                })
            });
        let randomizer = Math.floor((Math.random() * workouts.length));
        this.setState({
            title: workouts[randomizer].title,
            image: workouts[randomizer].image,
            description: workouts[randomizer].description,
            targets: workouts[randomizer].targets,
            alt: workouts[randomizer].alt
        })
    }

    handleButton() {
        this.setState({
            isRunning: !this.state.isRunning
        })
    }

    handleEnd() {
        API.updateCurrentStreak(this.props.user.id);
    }

    handlePopup() {
        this.setState({
            isOver: !this.state.isOver
        })
    }

    render() {
        const { isRunning, isOver, lastWorkout, todaysDate, title, description, targets, image, alt } = this.state;
        if (lastWorkout === todaysDate) {
            return (
                <div><h1>Thanks for working out today. Come back again tomorrow!</h1></div>
            )
        }

        return (
            <div className='workout-page-container'>
                {
                    isOver === true ?
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
                            <p>Head to the Leaderboard and see your current streak.</p>
                            <p><Link to="/leaderboard">Go to Leaderboard</Link></p>
                        </div> :
                        <div></div>
                }
                <div className='workout-page-card'>
                <h1 className='workout-page-head'>{title}</h1>
                    <img className='workout-image' src={image} alt={alt}/>
                    <p style={{marginTop: '50px'}}><strong>Targets: </strong>{targets}</p>
                    <p><strong>Description: </strong>{description}</p>
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
                        {({ start, stop, timerState }) => (
                            <React.Fragment>
                                <div
                                    className='timer'
                                    style={isRunning === false ? ({ color: 'rgb(82, 82, 82)' }) : ({ color: 'rgb(239, 239, 241)' })}
                                >
                                    <Timer.Minutes />:
                                        <Timer.Seconds formatValue={(value) => value < 10 ? `0${value}` : value} />
                                </div>
                                <div className='botton-container'>
                                    {
                                        isRunning === false ?
                                            <button onClick={start} className='button-start'>START YOUR WORKOUT</button> :
                                            <button onClick={stop} className='button-stop'>STOP YOUR WORKOUT</button>
                                    }
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                </div>
            </div>
        )
    }
}

export default withAuth(Workout);
