import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import './styles/Feedback.css';
import StarRatingComponent from 'react-star-rating-component';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            comment: '',
            users: []
        }

        this.onStarClick = this.onStarClick.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        API.getUser(this.props.user.id)
            .then(res => {
                this.setState({
                    username: res.data.username
                })
            });
        API.getUsers(this.props.users)
            .then(res => {
                let users = res.data;
                this.setState({
                    users: users
                })
            });
        // let ratings = [];
        // let { users } = this.state;
        //     users.map(user => {
        //         if (user.comment !== '') {
        //             return ratings.push(user.rating)
        //         }
                
        //     })
        //     return console.log('ratings: ', ratings)
    }

    onStarClick(nextVal, prevVal, name) {
        this.setState({
            rating: nextVal
        })
    }

    handleChange(e) {
        this.setState({
            comment: e.target.value
        })
    }

    handleButton() {
        if (this.state.comment === '') {
            alert('Please enter a comment before sending your feedback.')
        }
        API.updateFeedback(this.props.user.id, this.state.rating, this.state.comment)
    }

    render() {
        const { users, username, rating } = this.state;
        return (
            <div className='feedback-container'>
                <div className='comments-container'>
                    <h1>Comments</h1>
                    <p>Average rating: {}</p>
                    {
                        users.reverse().map(user => {
                            return (
                                user.comment === '' ?
                                <div key={user._id}></div> :
                                <div className='user-feedback' key={user._id}>
                                    <p>{user.username}</p>
                                    <StarRatingComponent
                                        className='user-rating'
                                        name='rate'
                                        starCount={5.0}
                                        value={user.rating}
                                    />
                                    <p>{user.comment}</p>
                                    <p>{user.commentTimestamp}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='rating-container'>
                    <h1>Hello {username}. Rate us!</h1>
                    <StarRatingComponent
                        className='rating-component'
                        name='rate'
                        starCount={5}
                        value={rating}
                        onStarClick={this.onStarClick}
                        // onStarHover={}
                    />
                    <input onChange={this.handleChange}/>
                    <button className='rating-button' onClick={this.handleButton}>Send</button>
                </div>
            </div>
        )
    }
}

export default withAuth(Feedback);
