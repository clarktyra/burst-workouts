import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import './styles/Home.css'
import API from './../utils/API';
// import { link } from 'react-router-dom';
import { Collapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { tidbits } from '../utils/exercise-tidbits-data';



const titleStyle = {
  fontSize: '30px',
  textAlign: 'center'
}



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      currentDaysInRow: null,
      highestDaysInRow: null,
      totalDaysInRow: null,
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }


  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        currentDaysInRow: res.data.currentStreak,
        highestDaysInRow: res.data.longestStreak,
        totalDaysInRow: res.data.totalWorkouts
      })
    });
    let randomizer = Math.floor((Math.random() * tidbits.length));
    this.setState({
      title: tidbits[randomizer].title,
      text: tidbits[randomizer].text
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  setHover = () => { this.setState({ hovered: true }) }
  cancelHover = () => { this.setState({ hovered: false }) }






  render() {
    return (
      <div>
        <div className="container">
          <div className="container">
            <h1 style={titleStyle} id="welcomeTitle"> {this.state.username.toUpperCase()}</h1>

            <div className="row">

              <div className="col-sm">
                <Card id="middle-card" className="card">
                  <CardBody>
                    <CardTitle style={titleStyle}>{this.state.currentDaysInRow}</CardTitle>
                    <CardText> You have done a burst workout {this.state.currentDaysInRow} {(this.state.currentDaysInRow) == 1 ? " day " : " days "} in a row</CardText>
                  </CardBody>
                </Card>
              </div>

              <div className="col-sm">
              <div class="row ">
              <div className="col-sm">
                <Card id="last-card" className="card">
                  <CardTitle style={titleStyle}>4</CardTitle>
                  <CardText>You have complete 4 fire weeks </CardText>
                 
                </Card>
              </div>
                <div className="col-sm">
                 <Card id="last-card" className="card">
                  <CardTitle style={titleStyle}>1</CardTitle>
                  <CardText>You have complete 1 fire month</CardText>
            </Card>
              </div>
            </div>
            <br/>
            <div class="row ">
              <div className="col-sm">
                <Card id="first-card" className="card">
                  <CardBody>
                    <CardTitle style={titleStyle}>{this.state.highestDaysInRow}</CardTitle>
                    <CardText> Your longest workout streak is {this.state.highestDaysInRow} {(this.state.highestDaysInRow) == 1 ? " day " : " days "}</CardText>
                  </CardBody>
                </Card>
              </div>

              <div className="col-sm">
                <Card id="last-card" className="card">
                  <CardBody>
                    <CardTitle style={titleStyle}>{this.state.totalDaysInRow}</CardTitle>
                    <CardText> Your total number of burst workouts is {this.state.totalDaysInRow}</CardText>
                  </CardBody>
                </Card>
              </div>
              </div>
              </div>

            </div>
            <br/>
            

          </div>
          <br />
          <Link to="/workout"><Button className="homeButtons" color="warning">Click here for today's workout </Button></Link>
          <br />
          <br />
          <Button className="homeButtons" color="danger" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Exercise tidbit of the day!</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardTitle style={titleStyle}>{this.state.title}</CardTitle>
              <CardBody>{this.state.text}</CardBody>
            </Card>
          </Collapse>

        </div>
      </div>
    )
  }
}

export default withAuth(Home);
