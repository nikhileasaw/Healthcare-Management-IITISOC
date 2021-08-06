const homeController = require("../controllers/homecontroller");
const user=require('../models/user');
const Entry = require('../models/entry');
const admin=require('../models/admin');
const bodyParser = require("body-parser");
const passport=require('passport');
// routes
const initRoutes=(app)=>{
// create home route
app.get("/", homeController().index);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//creates login part
app.get('/login', (req, res) => {
  res.render("loginpage");
});
app.get('/adminlogin', (req, res) => {
  res.render("adminlogin");
});

app.get('/patientlogin', (req, res) => {
  res.render("patientlogin");
});
app.get('/doctorlogin', (req, res) => {
  res.render("doctorlogin");
});
app.get('/adminprofile',(req,res)=>{
  res.render('adminprofile');
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

//kirtika
app.get('/addform',(req,res) =>{
  res.render('addform');
})
app.get('/info',(req,res) =>{
  Entry.find({}, function(err,data)
{
  entry=data;
  console.log("abc");
    res.render('index',{'a':data});
});
});
app.post('/adminlogin',passport.authenticate('local',{failureRedirect:"/login-failure",SuccessRedirect:"/adminprofile"}));

app.post("/addform",function(req,res){
  console.log(req.body.name);
  var entry = new Entry({
      name: req.body.name,
      department: req.body.department,
  })

  entry.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result);
      }

  })
  Entry.find({}, function(err,data)
{
  entry=data;
  console.log("abc");
    res.render('index',{'a':data});
});
})
//login part ends
app.use((req, res) => {
  res.render("error");
});
};
module.exports=initRoutes;
