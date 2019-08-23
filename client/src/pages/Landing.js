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
            <Picture src={apartment}/>
            </div>
        )
    }
}

export default Landing;