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
const connectDB = require("./config/database");

// test

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Connect To Database
// connectDB();

// paths for our routes
const mainRoutes = require('./routes/main');
const friendsRoutes = require('./routes/friends')
const googleRoutes = require('./routes/google');


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
  symptoms: [String],
  medications: [String]
});

const Patient = mongoose.model("Patient", patientSchema);


// app.get("/api/patients", (req, res)=> {
//     res.json({
//         patients: [
//           {
//             id: "1",
//             name: "Dwight Schrute",
//             domain: "patient",
//             email: "Dwight@office.com",
//             age: 20,
//             gender: "male",
//             date_of_birth: "2020/03/20",
//             date_of_last_visit: "2020/03/20",
//             symptoms: [{ value: "Cough" }, { value: "Headache" }],
//             medicines: [{ meds: "Diphenhydramine" }]
//           },
//           {
//             id: "2",
//             name: "James Halpert",
//             domain: "patient",
//             email: "James@office.com",
//             age: 20,
//             gender: "male",
//             date_of_birth: "2020/03/20",
//             date_of_last_visit: "2020/03/20",
//             symptoms: [{ value: "Fever" }, { value: "Cold" }],
//             medicines: [{ meds: "Crocin" }, { meds: "Vicks" }]
//           }
//         ]
//       })
// })

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

app.get("/", (req, res) => {
  res.send("Hello World!");
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
app.use('/', mainRoutes);
app.use('/friends', friendsRoutes);
app.use('/auth', googleRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});



