import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Navibar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }


    showNavigation = () => {
        if (this.Auth.loggedIn()) {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/workout">Workout</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/profile">Feedback</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/profile">Settings</Link>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    };

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <div className="container">
                    <Link className="navbar-brand" to="/home">Burst Workouts</Link>
                    <Navbar color="faded" light>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse isOpen={!this.state.collapsed} navbar>
                            {this.showNavigation()}
                        </Collapse>
                    </Navbar>
                </div>
            </nav>








        )
    }
}

export default Navibar;