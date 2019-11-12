import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import './styles/Home.css'
import API from './../utils/API';
// import { link } from 'react-router-dom';
import { Collapse, Button, CardBody, Card, CardTitle, CardSubtitle, CardText, Progress, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { tidbits } from '../utils/exercise-tidbits-data';


const icon1Style = {
  color: 'orange'
}
const icon2Style = {
  color: 'red'
}
const icon3Style = {
  color: 'green'
}

const titleStyle = {
  fontSize: '50px',
  textAlign: 'center'
}

const title1Style = {
  fontSize: '175px',
  textAlign: 'center'
}

const subTitleStyle = {
  fontFamily: "block-header",

  fontSize: '30px',
  textAlign: 'center'
}

const cardStyle = {
  height: '100%'
}

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const progessStyle = {
  backgroundColor: '#FF0000'
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
      fireWeeks: null,
      fireMonths: null,
      modal: false
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
        totalDaysInRow: res.data.totalWorkouts,
        fireWeeks: res.data.fireWeeks,
        fireMonths: res.data.fireMonths,
      })
    });
    let randomizer = Math.floor((Math.random() * tidbits.length));
    this.setState({
      title: tidbits[randomizer].title,
      text: tidbits[randomizer].text
    })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  setHover = () => { this.setState({ hovered: true }) }
  cancelHover = () => { this.setState({ hovered: false }) }






  render() {
    var fireWeekPercentage = (parseInt(((this.state.currentDaysInRow % 7) / 7) * 100));
    console.log(fireWeekPercentage);

    var fireMonthPercentage = (parseInt(((this.state.currentDaysInRow % 30) / 30) * 100));
    console.log(fireMonthPercentage);
    var breakStreakPercentage;
    if (this.state.currentDaysInRow <= this.state.highestDaysInRow) {
      breakStreakPercentage = (parseInt((this.state.currentDaysInRow / (this.state.highestDaysInRow + 0.00000000000001)) * 100));
    } else {
      breakStreakPercentage = 100
    }

    console.log(breakStreakPercentage)

    return (
      <div className="everything">
        <br />


        <div className="container" id="homeContainer">


          <br />
          <h1 style={titleStyle} id="welcomeTitle"> {this.state.username.toUpperCase()}</h1>

          <div className="row">
            

            <div className="col-sm">
              <Card id="middle-card" className="card" style={cardStyle}>
                <CardBody>
                  <CardSubtitle style={subTitleStyle}>Current Streak

                  </CardSubtitle>
                  <CardTitle style={title1Style}>{this.state.currentDaysInRow}</CardTitle>
                  {/*<CardText> You have done a burst workout {this.state.currentDaysInRow} {(this.state.currentDaysInRow) == 1 ? " day " : " days "} in a row</CardText> */}
                </CardBody>
              </Card>
            </div>

            <div className="col-sm">
              <div className="row ">
                <div className="col-sm">
                  <Card id="first-card" className="card">
                    <CardBody>
                      <CardSubtitle style={subTitleStyle}>Fire Weeks <i class="fas fa-fire" style={icon1Style}></i>
                      </CardSubtitle>
                      <CardTitle style={titleStyle}>{this.state.fireWeeks}</CardTitle>
                      {/* 
                  <CardText>You have complete 4 fire weeks </CardText>
                  */}
                    </CardBody>
                  </Card>
                </div>
                <div className="col-sm">
                  <Card id="last-card" className="card">
                    <CardBody>
                      <CardSubtitle style={subTitleStyle}>Fire Months <i class="fas fa-fire-alt" style={icon2Style}></i>

                      </CardSubtitle>
                      <CardTitle style={titleStyle}>{this.state.fireMonths}</CardTitle>
                      {/* 
                  <CardText>You have complete 1 fire month</CardText>
                  */}
                    </CardBody>
                  </Card>
                </div>
              </div>
              <br />
              <div className="row ">


                <div className="col-sm">
                  <Card id="last-card" className="card">
                    <CardBody>
                      <CardSubtitle style={subTitleStyle} >Total Bursts
                      </CardSubtitle>
                      <CardTitle style={titleStyle}>{this.state.totalDaysInRow}</CardTitle>
                      {/* 
                    <CardText> Your total number of burst workouts is {this.state.totalDaysInRow}</CardText>
                    */}
                    </CardBody>
                  </Card>
                </div>
                <div className="col-sm">
                  <Card id="first-card" className="card">
                    <CardBody>
                      <CardSubtitle style={subTitleStyle}>Longest Streak <i class="fas fa-mountain" style={icon3Style}></i>

                      </CardSubtitle>
                      <CardTitle style={titleStyle}>{this.state.highestDaysInRow}</CardTitle>
                      {/* 
                    <CardText> Your longest workout streak is {this.state.highestDaysInRow} {(this.state.highestDaysInRow) == 1 ? " day " : " days "}</CardText>
                    */}
                    </CardBody>
                  </Card>
                </div>

              </div>
            </div>

          </div>
          <br />
          <br />
          <div className="text-center" ><i class="fas fa-fire" style={icon1Style}></i></div>
          <Progress color="warning" value={fireWeekPercentage}>{fireWeekPercentage}%</Progress>
          <br />
          <div className="text-center"><i class="fas fa-fire-alt" style={icon2Style}></i></div>
          <Progress color="danger" value={fireMonthPercentage}>{fireMonthPercentage}%</Progress>
          <br />
          <div className="text-center"><i class="fas fa-mountain" style={icon3Style}></i></div>
          <Progress color="success" value={breakStreakPercentage}>{breakStreakPercentage}%</Progress>
          <br />
          <div style={buttonStyle}>



            <Button className="homeButtons" color="warning" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Exercise tidbit of the day!</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
              <ModalBody>
                {this.state.text}
              </ModalBody>
              <ModalFooter>
                <Link to="/workout"><Button className="homeButtons" color="warning">Click here for today's workout </Button></Link>{' '}
                <Button className="homeButtons" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>
          </div>





        </div>
        <br />
      </div>
    )
  }
}

export default withAuth(Home);
