import React, {Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import { link } from 'react-router-dom';

class Home extends Component {
    state = {
        username: "",
        email: ""
      };

      componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
          this.setState({
            username: res.data.username,
            email: res.data.email
          })
        });
      }

    render(){
        return (
            <div>
                <h1>Welcome {this.state.username} to your home page</h1>
            </div>
        )
    }
}

export default withAuth(Home);