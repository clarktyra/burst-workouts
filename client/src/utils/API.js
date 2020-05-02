import axios from 'axios';
import moment from 'moment';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // Gets all users for leaderboard table
  getUsers: () => {
    return axios.get(`/api/user`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password) => {
    return axios.post('api/signup', {
      username: username,
      email: email,
      password: password,
      currentStreak: 0,
      longestStreak: 0,
      totalWorkouts: 0,
      lastWorkout: '',
      fireWeeks: 0,
      fireMonths: 0
    });
  },
  // Updates current streak
  updateCurrentStreak: (id) => {
    return axios.put(`/api/user/${id}`)
  },
  // Updates user review and rating
  updateFeedback: (username, rating, review) => {
    return axios.post(`/api/feedback`, {
      username: username,
      rating: rating,
      review: review,
      reviewTimestamp: moment().format('MM-DD-YYYY h:mm:ss a')
    })
  },
  // Gets feedback from the database
  getFeedback: () => {
    return axios.get('/api/feedback');
  },
  // Deletes user on settings page
  deleteUser: (id) => {
    return axios.delete(`/api/user/${id}`);
  }
};
