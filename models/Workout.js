const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const WorkoutsSchema = new Schema({
    workoutUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Workouts = mongoose.model('Workouts', WorkoutsSchema);

module.exports = Workouts;
