const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const path = require('path');
const connectDB = require("./config/database");

// PORT = 5000

// test

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });
console.log(process.env)

//Connect To Database
connectDB();

// paths for our routes
// const mainRoutes = require('./routes/main');
// const friendsRoutes = require('./routes/friends')
// const googleRoutes = require('./routes/google');
const Patient = require('./models/Patient')


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());

// Setup Sessions - stored in MongoDB
app.use(session({
  secret: 'cheevus the black cat',
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI}),
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect to MongoDB
app.get("/api/patients", (req, res) => {
  mongoose.connect(MONGO_URI, (err, client) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    const db = client.db("clientPortal");
    const collection = db.collection("patients");
    collection.find({}).toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.json({ patients: docs });
    });
  });
});


// A mock database of users
const users = [
  {
    id: '10',
    password: '1234',
    domain: 'doctor',
    email: 'Michael@office.com'
  },
  {
    id: '1',
    password: '1234',
    domain: 'patient',
    email: 'dwight@office.com'
  },
  {
    id: '2',
    password: '1234',
    domain: 'patient',
    email: 'James@office.com'
  }
];

app.post('/api/addpatient', (req, res) => {
  // Get the patient data from the request body
  const patient = req.body;

  // Create a new patient document using the Patient model
  const newPatient = new Patient({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    symptoms: req.body.symptoms,
    medicines: req.body.meds,
    dateOfBirth: req.body.date_of_birth,
    lastVisited: req.body.date_of_last_visit 
  });
  console.log(newPatient)

  // Save the patient document to the database
  newPatient.save((err, result) => {
    if (err) {
      console.error(err);
      res.send({ success: false });
    } else {
      // Patient saved successfully
      res.send({ success: true });
    }
  });
});



app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    // with the response(res.send) to the front end, we must include user: { id: user.id, domain: user.domain } because the front end needs to determine which page to redirect the user to after they log in
    res.send({ success: true, user: { id: user.id, domain: user.domain } });
  } else {
    res.send({ success: false });
  }
});


// // The login endpoint
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(user => user.email === email && user.password === password);
//   if (user) {
//     res.json({ success: true, user });
//   } else {
//     res.json({ success: false });
//   }
// });

// module.exports = router;

//home page => mainroute; find in routes folder
// app.use('/', mainRoutes);
// app.use('/friends', friendsRoutes);
// app.use('/auth', googleRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!", process.env.PORT);
});



