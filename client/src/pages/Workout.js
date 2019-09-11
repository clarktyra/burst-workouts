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
            todaysDate: moment().format('YYYY-MM-DD'),
            selected: false,
            selectedWorkoutData: ''
        }

        this.handleButton = this.handleButton.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handlePopup = this.handlePopup.bind(this);
        this.handleWorkoutClick = this.handleWorkoutClick.bind(this);
    }

    componentDidMount() {
        API.getUser(this.props.user.id)
            .then(res => {
                this.setState({
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

    handleWorkoutClick(id) {
        const selectedWorkoutData = workouts.find(workout => workout.id === id);
        this.setState({
            selectedWorkoutData: selectedWorkoutData,
            selected: !this.state.selected
        })
    }

    render() {
        const { isRunning, isOver, lastWorkout, todaysDate, selectedWorkoutData, selected, title, description, targets, image, alt } = this.state;
        if (lastWorkout === todaysDate) {
            // This renders when the user has already worked out today and they select workout.
            return (
                <div className='alternate-workout-container'>
                    {
                        selected === true ?
                        <div className='selected-container'>
                            <div className='selected'>
                                <div className='close' onClick={this.handleWorkoutClick}>X</div>
                                <h3>{selectedWorkoutData.title}</h3>
                                <img src={selectedWorkoutData.image} alt={selectedWorkoutData.alt}/>
                                <p style={{marginTop: '15px'}}><strong>Targets: </strong>{selectedWorkoutData.targets}</p>
                                <p><strong>Description: </strong>{selectedWorkoutData.description}</p>
                                <div className='selected-timer-container'>
                                    <Timer
                                        initialTime={2000} 
                                        direction='backward' 
                                        startImmediately={false}  
                                        onStart={this.handleButton} 
                                        onStop={this.handleButton}
                                        checkpoints={
                                            [{
                                                time: 0,
                                                callback: this.handleWorkoutClick
                                            },{
                                                time: 0,
                                                callback: this.handleButton
                                            }]
                                        }
                                    >
                                        {({ start, stop }) => (
                                            <React.Fragment>
                                                <div
                                                    className='selected-timer'
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
                        </div> :
                        <div></div>
                    }
                    {/* This renders when the user has already worked out. */}
                    <h1>Thanks For Working Out Today!</h1>
                    <h2>You may continue to work out if you'd like but it won't count towards your current streaks. Here is a list of our workouts...</h2>
                    <div className='workouts'>
                        {
                            workouts.map((workout) => 
                                <div className='workout' key={workout.id} onClick={() => this.handleWorkoutClick(workout.id)}>
                                    <h3>{workout.title}</h3>
                                    <img src={workout.image} alt={workout.alt}/>
                                    <p style={{marginTop: '15px'}}><strong>Targets: </strong>{workout.targets}</p>
                                    <p><strong>Description: </strong>{workout.description}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
        return (
            <div className='workout-page-container'>
            {/* This is what renders when the user has just finished their workout (pop-up). */}
                {
                    isOver === true ?
                        <div className='workout-pop-up-container'>
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
                            </div>
                        </div> :
                        <div></div>
                }
                {/* This is what renders when the usser is ready to workout. */}
                <div className='workout-page-card'>
                    <h1 className='workout-page-head'>{title}</h1>
                    <img className='workout-image' src={image} alt={alt}/>
                    <p style={{marginTop: '50px'}}><strong>Targets: </strong>{targets}</p>
                    <p><strong>Description: </strong>{description}</p>
                    
                </div>
                <div className='timer-container'>
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
                        {({ start, stop }) => (
                            <React.Fragment>
                                <h1>TIMER</h1>
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
