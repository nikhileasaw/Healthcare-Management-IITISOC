const express = require("express");
const path = require("path");
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const app = express();
mongoose.connect("mongodb+srv://admin:admin@useridpassword.hgsdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){

});
const authenticaton=new mongoose.Schema({
  username:String,
  password:String
});

// assests
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static('static'))

// set template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// routes
require(path.join(__dirname, "/routes/web"))(app);

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
