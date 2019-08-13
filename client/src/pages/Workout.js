import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import AuthService from './../components/AuthService';
// import API from './../utils/API';
import '../App.css';
import Timer from 'react-compound-timer';

class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }

        this.handleButton = this.handleButton.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
    }

    handleButton() {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    handleEnd() {
        alert('finished');
    }

    render() {
        return (
            <div>
                <Timer initialTime={300000} 
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
                            <div  className='timer'>
                                <Timer.Minutes />:
                                <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}/>
                            </div>
                            <div className='botton-container'>
                                {this.state.isPlaying === false ? <button onClick={start} className='button-start'>start</button> : <button onClick={stop} className='button-stop'>stop</button>}
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