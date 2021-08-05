const router=require('express').Router();
const passport=require('passport');
const bodyParser = require("body-parser");
const admin=require('../models/admin');
const genPassword=require('../lib/passwordUtilities').genPassword;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
//auth login

router.get('/signup',(req,res)=>{
  res.render('signup');
});
router.post('/signup',(req,res,next)=>{
  const saltHash=genPassword(req.body.pw);
  const salt=saltHash.salt;
  const hash=saltHash.hash;
  const newAdmin= new admin({
    username:req.body.uname,
    hash:hash,
    salt:salt
  });
  newAdmin.save()
  .then((user)=>{
    console.log(user);
  });
  res.redirect('/adminlogin')
})
//auth-logout
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect("/");
});
//auth-handle with google
router.get('/google',passport.authenticate('google',{
  scope:['profile','email']
}));
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.redirect('/profile/')
});
//auth with localStrategy
router.post('/adminlogin',passport.authenticate('local',{failureRedirect:"/login-failure",SuccessRedirect:"/adminprofile"}));
module.exports=router;
