// creating middleware
const express = require("express");
const app = express();
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const flash=require('connect-flash');
const morgan=require('morgan');
const passport=require("passport");
const session=require('express-session');
const cookieParser=require('cookie-parser');
const path=require('path');


//connecting to database
mongoose.connect("mongodb+srv://admin:admin@useridpassword.hgsdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});//connected to the external database


//setting up express application
app.use(morgan('dev'));//logs request to console
app.use(cookieParser());//reads cookies
app.use(bodyParser());//recieves information from forms

app.set("view engine", "ejs");//setting up ejs

//setting up passport
app.use(session({secret:'thesecret'}));//session secret
app.use(passport.initialize());
app.use(passport.session());//persistent login session
app.use(flash());//use connect-flash to flash messages stored in session

//setting up routes
require(path.join(__dirname, "/routes/web"))(app);
require('./config/passport');


// set template engine
app.set("views", path.join(__dirname, "/views"));


// assests
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(__dirname + '/public'));




// routes


app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
