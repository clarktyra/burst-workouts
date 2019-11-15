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
            feedback: [],
            avRating: 0
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
                let ratings = [];
                let sum = 0;
                feedback.map(fb => {
                    return ratings.push(fb.rating)
                });
                ratings.map(rate => {
                    return (sum += rate);
                })
                let avRating = (sum / ratings.length).toFixed(1);
                this.setState({
                    feedback: feedback,
                    avRating: avRating
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
        if (this.state.rating === 0) {
            alert('Please enter a rating before sending your feedback.')
        }
        else {
        API.updateFeedback(this.state.username, this.state.rating, this.state.review);
        API.getFeedback(this.props.feedback)
            .then(res => {
                let feedback = res.data.reverse();
                this.setState({
                    feedback: feedback,
                    rating: 0,
                    review: ''
                })
            });
        }
    }

    render() {
        const { feedback, username, review, rating, avRating } = this.state;
        return (
            <div className='feedback-container'>
                <div className='rating-container'>
                    <h1>Rate Us</h1>
                    <h2>Hello {username}</h2>
                    <StarRatingComponent
                        className='rating-component'
                        name='rate'
                        starCount={5}
                        value={rating}
                        onStarClick={this.onStarClick}
                        />
                    <p>Please give us an awesome rating!</p>
                    <textarea
                        className='review-input'
                        value={review}
                        onChange={this.handleChange}
                        maxLength='500'
                        placeholder='Enter review here (limit 500 characters)'
                    />
                    <button className='rating-button' onClick={this.handleButton}>Submit</button>
                </div>
                <div className='reviews-container'>
                    <h1>Reviews</h1>
                    <p className='rating-average'>Average rating: {avRating}/5</p>
                    {
                        feedback.map(fb => {
                            return (
                                <div className='user-feedback' key={fb._id}>
                                    <div className='feedback-wrapper'>
                                        <p className='username'>{fb.username}</p>
                                        <StarRatingComponent
                                            className='user-rating'
                                            name='rate'
                                            starCount={5.0}
                                            value={fb.rating}
                                        />
                                    </div>
                                    <p className='user-review'>{fb.review}</p>
                                    <p className='user-review-timestamp'>{fb.reviewTimestamp}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withAuth(Feedback);
