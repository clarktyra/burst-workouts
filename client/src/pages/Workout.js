import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import { Link } from "react-router-dom";
import API from "./../utils/API";
import "./styles/Workout.css";
import Timer from "react-compound-timer";
import { workouts } from "../utils/workout-data";
import moment from "moment";
import { Col, Row } from "reactstrap";

class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isOver: false,
      lastWorkout: "",
      todaysDate: moment().format("YYYY-MM-DD"),
      selected: false,
      selectedWorkoutData: ""
    };

    this.handleButton = this.handleButton.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.handleWorkoutClick = this.handleWorkoutClick.bind(this);
    this.nextExercise = this.nextExercise.bind(this);
  }

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        lastWorkout: res.data.lastWorkout
      });
    });
    let randomizer = Math.floor(Math.random() * workouts.length);
    this.setState({
      title: workouts[randomizer].title,
      image: workouts[randomizer].image,
      // description: workouts[randomizer].description,
      targets: workouts[randomizer].targets,
      alt: workouts[randomizer].alt
    });
  }

  handleButton() {
    this.setState({
      isRunning: !this.state.isRunning
    });
  }

  handleEnd() {
    API.updateCurrentStreak(this.props.user.id);
  }

  handlePopup() {
    this.setState({
      isOver: !this.state.isOver
    });
  }

  handleWorkoutClick(id) {
    const selectedWorkoutData = workouts.find(workout => workout.id === id);
    this.setState({
      selectedWorkoutData: selectedWorkoutData,
      selected: !this.state.selected
    });
  }

  nextExercise() {
    let randomizer = Math.floor(Math.random() * workouts.length);
    this.setState({
      title: workouts[randomizer].title,
      image: workouts[randomizer].image,
      // description: workouts[randomizer].description,
      targets: workouts[randomizer].targets,
      alt: workouts[randomizer].alt
    });
  }

  render() {
    const {
      isRunning,
      isOver,
      lastWorkout,
      todaysDate,
      selectedWorkoutData,
      selected,
      title,
      description,
      targets,
      image,
      alt
    } = this.state;
    const ExerciseNumber = 0;
    const totalExercised = 5;
    return (
      <div className="workout-page-container">
        {isOver === true ? (
          <div className="workout-pop-up-container">
            <div className="workout-pop-up">
              <div className="arc">
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
              <p>
                <Link to="/leaderboard">Go to Leaderboard</Link>
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <Row>
          <Col>
            <div className="workout-page-card">
              <h1 className="workout-page-head">{title}</h1>
              <img className="workout-image" src={image} alt={alt} />
            </div>
          </Col>
          <Col>
            <div className="timer-container">
              <Timer
                initialTime={300000}
                direction="backward"
                startImmediately={false}
                onStart={this.handleButton}
                onStop={this.handleButton}
                checkpoints={[
                  {
                    time: 300000,
                    callback: this.nextExercise
                  },
                  {
                    time: 280000,
                    callback: this.nextExercise
                  },
                  {
                    time: 260000,
                    callback: this.nextExercise
                  },
                  {
                    time: 240000,
                    callback: this.nextExercise
                  },
                  {
                    time: 220000,
                    callback: this.nextExercise
                  },
                  {
                    time: 200000,
                    callback: this.nextExercise
                  },
                  {
                    time: 180000,
                    callback: this.nextExercise
                  },
                  {
                    time: 160000,
                    callback: this.nextExercise
                  },
                  {
                    time: 140000,
                    callback: this.nextExercise
                  },
                  {
                    time: 120000,
                    callback: this.nextExercise
                  },
                  {
                    time: 100000,
                    callback: this.nextExercise
                  },
                  {
                    time: 80000,
                    callback: this.nextExercise
                  },
                  {
                    time: 60000,
                    callback: this.nextExercise
                  },
                  {
                    time: 40000,
                    callback: this.nextExercise
                  },
                  {
                    time: 20000,
                    callback: this.nextExercise
                  },
                  {
                    time: 0,
                    callback: this.handleEnd
                  },
                  {
                    time: 0,
                    callback: this.handlePopup
                  }
                ]}
              >
                {({ start, stop }) => (
                  <React.Fragment>
                    <h1>TIMER</h1>
                    <div
                      className="timer"
                      style={
                        isRunning === false
                          ? { color: "rgb(82, 82, 82)" }
                          : { color: "rgb(239, 239, 241)" }
                      }
                    >
                      <Timer.Minutes />:
                      <Timer.Seconds
                        formatValue={value =>
                          value < 10 ? `0${value}` : value
                        }
                      />
                    </div>
                    <div className="botton-container">
                      {isRunning === false ? (
                        <button onClick={start} className="button-start">
                          START YOUR WORKOUT
                        </button>
                      ) : (
                        <button onClick={stop} className="button-stop">
                          STOP YOUR WORKOUT
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                )}
              </Timer>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAuth(Workout);
