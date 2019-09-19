const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const FeedbackSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    review: {
        type: String,
        required: false
    },
    reviewTimestamp: {
        type: String,
        required: false
    }
})

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
