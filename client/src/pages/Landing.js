import React, { Component } from 'react';
import apartment from '../images/apartment.jpg'
import styled from 'styled-components';
import './Landing.css';

import {
    Collapse,
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Jumbotron, Container, CardDeck
} from 'reactstrap';


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

const containerStyle = {
    backgroundImage: { apartment }
}

class Landing extends Component {
    render() {
        return (

            <div id="total">
                <br />
                
                <section className="hero space-md">
                    <div className="container" >
                    
                    <br />
                    <br />
                        <div className="row d-flex align-items-center justify-content-center text-center">
                            <div className="col-md-10 centered2">
                                <div className="title-content-warpper">
                                    <h1 id="landingHeader">The best way to consistently work out</h1>
                                </div>
                            </div>
                        </div>
                        <br />
                
                <br />
                <br />
                        <div className="mt-5 mb-5">
                            <div className="row text-center centered">
                                <div className="col-12 col-md-4">
                                    <div className="feature-box">
                                        <div className="mb-2">
                                            <div className="icon display-3 mb-3"><i className="fas fa-fire-alt"></i></div>
                                            <h3 className="landingH3">What to expect</h3>
                                            <p className="landingP">Burst Workouts gives you access to a unique short workout to complete every day</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="feature-box">
                                        <div className="mb-2">
                                        {/*
                                            <div className="icon display-3 mb-3"><i className="fas fa-fire"></i></div>
                                            <h3>The Burst Method</h3>
                                            <p>Each consecutive workout adds to your Burst Streak, which improves your workout consistency!</p>
                                        */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="feature-box">
                                        <div className="mb-2">
                                            <div className="icon display-3 mb-3"><i class="fas fa-user-friends"></i></div>
                                            <h3 className="landingH3">Online Comunity</h3>
                                            <p className="landingP">Challenge your friends and our online comunity for the longest streaks</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*
                        <div className="mt-5 mb-5">
                            <div className="row text-center centered">
                                <div className="col-12 col-md-4">
                                    <div className="feature-box">
                                        <div className="mb-2">
                                            <div className="icon display-3 mb-3"><i class="fas fa-dumbbell"></i></div>
                                            <h3>Fun Workouts</h3>
                                            <p>Burst Workouts gives you access to a unique short workout to complete every day</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="feature-box">
                                        <div className="mb-2">
                                            <div className="icon display-3 mb-3"><i className="fas fa-fire"></i></div>
                                            <h3>The Burst Method</h3>
                                            <p>Each consecutive workout adds to your Burst Streak, which improves your workout consistency!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="feature-box">
                                        <div className="mb-2">
                                            <div className="icon display-3 mb-3"><i className="fab fa-lastfm"></i></div>
                                            <h3>Online Comunity</h3>
                                            <p>Challenge your friends and our online comunity for the longest streaks</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        */}
                        <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                
                <br />
                    </div>

                </section>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>
            /*
                            <div className="container">
            
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="container2" style={cardStyle} >
            
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
                                                        <CardTitle style={titleStyle}>The Burst Method</CardTitle>
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
            
                                    <div class="col-md-8">
                                        <div class="container2" style={cardStyle} src={apartment}>
                                            <Picture src={apartment} />
            
                                        </div>
            
                                    </div>
            
            
            
            
                                </div>
            
            
            
            */
        )
    }
}

export default Landing;