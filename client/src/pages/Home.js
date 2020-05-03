import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import "./styles/Home.css";
import API from "./../utils/API";
// import { link } from 'react-router-dom';
import {
 
  CardBody,
  Card,
  CardTitle,
  CardSubtitle,
  Progress,
  
  Container,
  Row,
  Col
} from "reactstrap";
import { tidbits } from "../utils/exercise-tidbits-data";

const icon1Style = {
  color: "orange"
};
const icon2Style = {
  color: "red"
};


const titleStyle = {
  fontSize: "50px",
  textAlign: "center",
  color: "rgb(187, 187, 194)"

};



const subTitleStyle = {
  color: "rgb(187, 187, 194)",

  fontFamily: "block-header",

  fontSize: "30px",
  textAlign: "center"
};



class Home extends Component {
  constructor(props) {
    super(props);
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
        fireMonths: res.data.fireMonths
      });
    });
    let randomizer = Math.floor(Math.random() * tidbits.length);
    this.setState({
      title: tidbits[randomizer].title,
      text: tidbits[randomizer].text
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  setHover = () => {
    this.setState({ hovered: true });
  };
  cancelHover = () => {
    this.setState({ hovered: false });
  };

  render() {
    var fireWeekPercentage = parseInt(
      ((this.state.currentDaysInRow % 7) / 7) * 100
    );
    console.log(fireWeekPercentage);

    var fireMonthPercentage = parseInt(
      ((this.state.currentDaysInRow % 30) / 30) * 100
    );
    console.log(fireMonthPercentage);
    var breakStreakPercentage;
    if (this.state.currentDaysInRow <= this.state.highestDaysInRow) {
      breakStreakPercentage = parseInt(
        (this.state.currentDaysInRow /
          (this.state.highestDaysInRow + 0.00000000000001)) *
          100
      );
    } else {
      breakStreakPercentage = 100;
    }

    console.log(breakStreakPercentage);

    return (
      <div>
        <Container id="homeContainer">
        <h1 style={titleStyle} id="welcomeTitle">
        {" "}
        {this.state.username.toUpperCase()}
      </h1>
          <Row>
            <Col>
              <Card id="middle-card" className="card" >
                <CardBody>
                  <CardSubtitle style={subTitleStyle}>
                    Current Streak
                  </CardSubtitle>
                  <CardTitle style={titleStyle}>
                    {this.state.currentDaysInRow}
                  </CardTitle>
                  {/*<CardText> You have done a burst workout {this.state.currentDaysInRow} {(this.state.currentDaysInRow) == 1 ? " day " : " days "} in a row</CardText> */}
                </CardBody>
              </Card>
            </Col>
            <Col>
            <Card id="first-card" className="card">
            <CardBody>
              <CardSubtitle style={subTitleStyle}>
                Longest Streak{" "}
              </CardSubtitle>
              <CardTitle style={titleStyle}>
                {this.state.highestDaysInRow}
              </CardTitle>
              {/* 
        <CardText> Your longest workout streak is {this.state.highestDaysInRow} {(this.state.highestDaysInRow) == 1 ? " day " : " days "}</CardText>
        */}
            </CardBody>
          </Card>
          </Col>
            <Col>
              <Card id="first-card" className="card">
                <CardBody>
                  <CardSubtitle style={subTitleStyle}>
                    Fire Weeks <i class="fas fa-fire" style={icon1Style}></i>
                  </CardSubtitle>
                  <CardTitle style={titleStyle}>
                    {this.state.fireWeeks}
                  </CardTitle>
                  {/* 
      <CardText>You have complete 4 fire weeks </CardText>
      */}
                </CardBody>
              </Card>
            </Col>
            <Col><Card id="last-card" className="card">
            <CardBody>
              <CardSubtitle style={subTitleStyle}>
                Fire Months{" "}
                <i class="fas fa-fire-alt" style={icon2Style}></i>
              </CardSubtitle>
              <CardTitle style={titleStyle}>
                {this.state.fireMonths}
              </CardTitle>
              {/* 
      <CardText>You have complete 1 fire month</CardText>
      */}
            </CardBody>
          </Card>
          </Col>
            
          </Row>

          <Row>
          <div className="progressSection">
              <div className="text-center">
                <i class="fas fa-fire" style={icon1Style}></i>
              </div>
              <Progress color="warning" value={fireWeekPercentage}>
                {fireWeekPercentage}%
              </Progress>
              <br />
              <div className="text-center">
                <i class="fas fa-fire-alt" style={icon2Style}></i>
              </div>
              <Progress color="danger" value={fireMonthPercentage}>
                {fireMonthPercentage}%
              </Progress>
              <br />
            </div>
          </Row>
        </Container>

        {/* BREAK 
        <div className="everything">
          <br />

          <div className="container" id="homeContainer">
            <div className="mytopSection">
              <br />
              <h1 style={titleStyle} id="welcomeTitle">
                {" "}
                {this.state.username.toUpperCase()}
              </h1>

              <div className="row">
                <div className="col-sm">
                  <Card id="middle-card" className="card" style={cardStyle}>
                    <CardBody>
                      <CardSubtitle style={subTitleStyle}>
                        Current Streak
                      </CardSubtitle>
                      <CardTitle style={title1Style}>
                        {this.state.currentDaysInRow}
                      </CardTitle>
                    </CardBody>
                  </Card>
                </div>

                <div className="col-sm">
                  <div className="row ">
                    <div className="col-sm">
                      <Card id="first-card" className="card">
                        <CardBody>
                          <CardSubtitle style={subTitleStyle}>
                            Fire Weeks{" "}
                            <i class="fas fa-fire" style={icon1Style}></i>
                          </CardSubtitle>
                          <CardTitle style={titleStyle}>
                            {this.state.fireWeeks}
                          </CardTitle>
                         
                        </CardBody>
                      </Card>
                    </div>
                    <div className="col-sm">
                      <Card id="last-card" className="card">
                        <CardBody>
                          <CardSubtitle style={subTitleStyle}>
                            Fire Months{" "}
                            <i class="fas fa-fire-alt" style={icon2Style}></i>
                          </CardSubtitle>
                          <CardTitle style={titleStyle}>
                            {this.state.fireMonths}
                          </CardTitle>
                         
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                  <br />
                  <div className="row ">
                    <div className="col-sm">
                      <Card id="last-card" className="card">
                        <CardBody>
                          <CardSubtitle style={subTitleStyle}>
                            Total Bursts
                          </CardSubtitle>
                          <CardTitle style={titleStyle}>
                            {this.state.totalDaysInRow}
                          </CardTitle>
                         
                        </CardBody>
                      </Card>
                    </div>
                    <div className="col-sm">
                      <Card id="first-card" className="card">
                        <CardBody>
                          <CardSubtitle style={subTitleStyle}>
                            Longest Streak{" "}
                            <i class="fas fa-mountain" style={icon3Style}></i>
                          </CardSubtitle>
                          <CardTitle style={titleStyle}>
                            {this.state.highestDaysInRow}
                          </CardTitle>
                          
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="progressSection">
              <div className="text-center">
                <i class="fas fa-fire" style={icon1Style}></i>
              </div>
              <Progress color="warning" value={fireWeekPercentage}>
                {fireWeekPercentage}%
              </Progress>
              <br />
              <div className="text-center">
                <i class="fas fa-fire-alt" style={icon2Style}></i>
              </div>
              <Progress color="danger" value={fireMonthPercentage}>
                {fireMonthPercentage}%
              </Progress>
              <br />
              <div className="text-center">
                <i class="fas fa-mountain" style={icon3Style}></i>
              </div>
              <Progress color="success" value={breakStreakPercentage}>
                {breakStreakPercentage}%
              </Progress>
              <br />
            </div>

            <div style={buttonStyle}>
              <Button
                className="homeButtons"
                color="warning"
                onClick={this.toggle}
                style={{ marginBottom: "1rem" }}
              >
                Exercise tidbit of the day!
              </Button>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>
                  {this.state.title}
                </ModalHeader>
                <ModalBody>{this.state.text}</ModalBody>
                <ModalFooter>
                  <Link to="/workout">
                    <Button className="homeButtons" color="warning">
                      Click here for today's workout{" "}
                    </Button>
                  </Link>{" "}
                  <Button className="homeButtons" onClick={this.toggle}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
          <br />
        </div>
        */}
      </div>
    );
  }
}

export default withAuth(Home);
