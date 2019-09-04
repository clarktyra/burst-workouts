import React, { Component } from 'react';
import apartment from '../images/apartment.jpg'
import styled from 'styled-components';
import './Landing.css';
import { Collapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';


const Picture = styled.img`
    width: 100%;
    border-radius: 15;
`;

const titleStyle = {
    fontSize: '30px'
}

const cardStyle = {
    fontFamily: 'Palatino, serif'
}



class Landing extends Component {
    render() {
        return (
            <div>
                <div class="container">
                <div class="container2" style={cardStyle} >
                    <Picture src={apartment} />
                    <div class="top-left"> </div>
                    <div class="top-right">Sign up Today!</div>
                    <div class="centered" style={titleStyle}>The best way to consistently workout</div>
                </div>
                    <div class="row">
                        <div class="col-sm">
                            <Card id="one-card" style={cardStyle}>
                                <CardBody>
                                    <CardTitle style={titleStyle}>What to expect</CardTitle>
                                    <CardText> Burst Workouts gives you access to a unique short workout to complete every day
                                </CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div class="col-sm">
                            <Card id="two-card" className="card" style={cardStyle}>
                                <CardBody>
                                    <CardTitle style={titleStyle}>The Burst Streak Method</CardTitle>
                                    <CardText>Each consecutive workout adds to your Burst Streak, which improves your workout consistency!
                                    </CardText>
                                </CardBody>
                            </Card>

                        </div>
                        <div class="col-sm">
                            <Card id="one-card" className="card" style={cardStyle}>
                                <CardBody>
                                    <CardTitle style={titleStyle}>Online Comunity</CardTitle>
                                    <CardText>Challenge your friends and our online comunity for the longest streaks
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;