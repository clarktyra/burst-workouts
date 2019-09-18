import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
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
      comment: '',
      rating: 0,
      timestamp: ''
    });
  },
  // Updates current streak
  updateCurrentStreak: (id) => {
    return axios.put(`/api/user/${id}`)
  },
  // Updates user comments and rating
  updateFeedback: (id, rating, comment) => {
    return axios.put(`/api/user/${id}/${rating}/${comment}`)
  }
};
