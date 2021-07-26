// creating middleware
const express = require("express");
const session=require('express-session');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const morgan=require('morgan');
const user=require('./models/user');
const authRoutes=require('./routes/authRoutes');
const path=require('path');
const keys=require('./config/keys');
const cookieSession=require('cookie-session');
const passport=require('passport');
const profileRoutes=require('./routes/patientprofile-routes')

const app = express();
//connecting to database
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>{console.log("connected to db")})
.catch((err)=>{console.log(err)});
//setting up express application
app.use(morgan('dev'));//logs request to console


app.set("view engine", "ejs");//setting up ejs



// set template engine
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use('/static', express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, "/views"));
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
require(path.join(__dirname,"/routes/web"))(app);



// assests

app.use(express.urlencoded({ extended: false }));





// routes


app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
