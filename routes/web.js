const homeController = require("../controllers/homecontroller");
const user=require('../models/user');
const Entry = require('../models/entry')
const bodyParser = require("body-parser");
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
app.get('/signup', (req, res) => {
  res.render("signup");
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

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.post('/patientlogin',(req,res)=>{
res.render('patientlogin')});
//kirtika
app.get('/addform',(req,res) =>{
  res.render('addform');
})
app.get('/info',(req,res) =>{
  res.render('index');
})
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

