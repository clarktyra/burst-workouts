import React, { Component } from 'react';
import apartment from '../images/apartment.jpg'
import styled from 'styled-components';
import './Landing.css';

const Picture = styled.img`
    width: 100%;
    border-radius: 0;
    background-color: blue;


`;


class Landing extends Component {
    render() {
        return (
            <div>
                
                <div class="container">
                <Picture src={apartment} />
                    <div class="row">
                        <div class="col-sm">
                            What to expect:
                            Burst Workouts gives you access to a unique short workout to complete every day
                        </div>
                        <div class="col-sm">
                            The Burst Streak method: 
                             Each consecutive workout adds to your Burst Streak, which improves your workout consistency!
                        </div>
                        <div class="col-sm">
                            Online comunity:
                            Challenge your friends and our online comunity for the longest streaks 
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;