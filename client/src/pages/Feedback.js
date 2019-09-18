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
            review: '',
            feedback: []
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
        API.getFeedback(this.props.feedback)
            .then(res => {
                let feedback = res.data.reverse();
                this.setState({
                    feedback: feedback
                })
            });
    }

    onStarClick(nextVal, prevVal, name) {
        this.setState({
            rating: nextVal
        })
    }

    handleChange(e) {
        this.setState({
            review: e.target.value
        })
    }

    handleButton() {
        if (this.state.review === '') {
            alert('Please enter a review before sending your feedback.')
        }
        API.updateFeedback(this.state.username, this.state.rating, this.state.review);
        API.getFeedback(this.props.feedback)
            .then(res => {
                let feedback = res.data;
                this.setState({
                    feedback: feedback.reverse(),
                    rating: 0,
                    review: ''
                })
            });
    }

    render() {
        const { feedback, username, review, rating } = this.state;
        return (
            <div className='feedback-container'>
                <div className='reviews-container'>
                    <h1>Reviews</h1>
                    <p>Average rating: {}</p>
                    {
                        feedback.map(fb => {
                            return (
                                <div className='user-feedback' key={fb._id}>
                                    <p>{fb.username}</p>
                                    <StarRatingComponent
                                        className='user-rating'
                                        name='rate'
                                        starCount={5.0}
                                        value={fb.rating}
                                    />
                                    <p>{fb.review}</p>
                                    <p>{fb.reviewTimestamp}</p>
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
                    <input value={review} onChange={this.handleChange}/>
                    <button className='rating-button' onClick={this.handleButton}>Send</button>
                </div>
            </div>
        )
    }
}

export default withAuth(Feedback);
