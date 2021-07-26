const homeController = require("../controllers/homecontroller");
const user=require('../models/user');
// routes
const initRoutes=(app)=>{
// create home route
app.get("/", homeController().index);
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
app.post('/signup', (req, res) => {
  const newuser = new user({
    username: 'first user',
    password: 'password1'
  });
  newuser.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post('/patientlogin',(req,res)=>{
res.render('patientlogin')});
//login part ends
app.use((req, res) => {
  res.render("error");
});
};
module.exports=initRoutes;
