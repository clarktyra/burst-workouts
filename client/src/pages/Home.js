import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import { link } from 'react-router-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      currentDaysInRow: 1,
      highestDaysInRow: 2,
      totalDaysInRow: 3,
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }
  

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }
  
  toggle() {
    this.setState( {collapse: !this.state.collapse });
  }

  render() {

    return (
      <div>
        <h1>Welcome {this.state.username} to your home page</h1>
        <div class="container">
          <div class="row">

            <div class="col-sm">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{this.state.currentDaysInRow}</h5>
                  <p class="card-text"> You have done a burst workout {this.state.currentDaysInRow} days in a row
                  </p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{this.state.highestDaysInRow}</h5>
                  <p class="card-text"> Your workout streak is {this.state.highestDaysInRow} days
                  </p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{this.state.totalDaysInRow}</h5>
                  <p class="card-text"> Your total number of bust workouts are {this.state.totalDaysInRow}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        <button type="button" className="btn btn-danger">Click here for today's workout</button>
        <br/>
        <br/>

        <Button color="danger" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Exercise tidbit of the day!</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            It is not about how hard you workout today. Its how consistent you have been in a lifetime.
            </CardBody>
          </Card>
        </Collapse>
        

      </div>
    )
  }
}

export default withAuth(Home);