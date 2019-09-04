import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import './styles/Home.css'
import API from './../utils/API';
// import { link } from 'react-router-dom';
import { Collapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';

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
        email: res.data.email, 
        currentDaysInRow: res.data.currentStreak
      })
    });
  }
  
  toggle() {
    this.setState( {collapse: !this.state.collapse });
  }

  setHover = () => {this.setState({hovered: true})}
  cancelHover = () => {this.setState({hovered: false})}

  


  render() {
    return (
      <div>
        
        <div class="container">
        <h1>Welcome {this.state.username} to your home page</h1>
          <div class="row">
            <div class="col-sm">
              <Card id="first-card" className="card">
                <CardBody>
                  <CardTitle style={titleStyle}>{this.state.currentDaysInRow}</CardTitle>
                  <CardText> You have done a burst workout {this.state.currentDaysInRow} 
                  {(this.state.currentDaysInRow) > 1 ? " days " : " day "}
                  in a row
                  </CardText>
                </CardBody>
              </Card>
            </div>

            <div className="col-sm">
              <Card id="middle-card" className="card">
                <CardBody>
                  <CardTitle style={titleStyle}>{this.state.highestDaysInRow}</CardTitle>
                  <CardText> Your longest workout streak is {this.state.highestDaysInRow} 
                  {(this.state.highestDaysInRow) > 1 ? " days " : " day "}
                  </CardText>
                </CardBody>
              </Card>
            </div>

            <div className="col-sm">
              <Card id="last-card" className="card">
                <CardBody>
                  <CardTitle style={titleStyle}>{this.state.totalDaysInRow}</CardTitle>
                  <CardText> Your total number of burst workouts is {this.state.totalDaysInRow}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          </div>
          <br/>
        <br/>
          <Button color="warning">Click here for today's workout</Button>
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
        <br />

        
        

      </div>
    )
  }
}

export default withAuth(Home);
