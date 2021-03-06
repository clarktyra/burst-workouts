require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
const db = require('./models');
const moment = require('moment');
const PORT = process.env.PORT || 3001;

const isAuthenticated = require("./config/isAuthenticated");
const auth = require("./config/auth");

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/workoutDB', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));


// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  auth
    .logUserIn(req.body.email, req.body.password)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err));
});

// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: 'No user found' });
      }
    }).catch(err => res.status(400).send(err));
});

app.get('/api/user', isAuthenticated, (req, res) => {
  db.User.find()
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: 'No users found' });
      }
    }).catch(err => res.status(400).send(err));
});

// Updates the user's current workout streak
app.put('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id, (err, user) => {
    if (err) throw err;
    let todaysDate = moment().format('YYYY-MM-DD');
    const incrementer = (count) => {
      return count + 1;
    }
    user.currentStreak = incrementer(user.currentStreak);
    user.totalWorkouts = incrementer(user.totalWorkouts);
    //Comment these out for testing
    if (user.lastWorkout !== moment(todaysDate).subtract(1, 'day').format('YYYY-MM-DD')) {
      user.currentStreak = 1;
    } 
    //Comment these out for testing
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }
    user.lastWorkout = todaysDate;  
    if (parseInt(user.currentStreak % 7) === 0){
      user.fireWeeks = incrementer(user.fireWeeks)
    }
    if ( (user.currentStreak % 30) === 0){
      user.fireMonths = incrementer(user.fireMonths)
    }
    user.save((err) => {
      if (err) throw err;
      console.log('current streak and last workout updated');
    })
  })
})

// Updates the user's review and rating
app.post('/api/feedback', isAuthenticated, (req, res) => {
  db.Feedback.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
})

// Gets all the feedback from the database
app.get('/api/feedback', isAuthenticated, (req, res) => {
  db.Feedback.find()
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: 'No users found' });
      }
    }).catch(err => res.status(400).send(err));
});

// delete user on settings page
app.delete('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findByIdAndRemove(req.params.id, (err, user) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: user._id
    };
    return res.status(200).send(response);
});
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('/', isAuthenticated /* Using the express jwt MW here */, (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
