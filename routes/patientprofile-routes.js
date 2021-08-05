const router=require('express').Router();
const bodyParser = require("body-parser");
const patientProfile = require('../models/patientprofile');
const user = require('../models/user');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const checkAuth=(req,res,next)=>{
  if(!req.user){
    res.redirect('/auth/login')
  }
  else{
    next();
  }
}
router.get('/',(req,res)=>{
  res.render('patientprofile',{user:req.user});
});
router.get('/appoinment',(req,res)=>{
  res.render('appoinment');
});
router.get('/updateprofile',(req,res)=>{
  res.render('updateprofile',{user:req.user});
});
// updating the profile of a patient if found or else creating a new patient profile
router.post('/updateprofile',(req,res)=>{
  Model
  let patientprofile= new patientProfile({
    email:req.body.email,
    dob: req.body.dob,
    alergies: req.body.alergy,
    permenantmedication: req.body.permed,
  })
  patientprofile.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result);
      }
    })
        res.redirect('/profile');

});
module.exports=router;
