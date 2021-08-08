const router=require('express').Router();
const bodyParser = require("body-parser");
const session=require("express-session");
const flush=require("connect-flash");
const patientProfile = require('../models/patientprofile');
const Entry = require('../models/entry');
const appoinment=require('../models/appoinment');
const user = require('../models/user');
// const express=require('express');
// const path=require('path');
router.use(session({
  secret:'secret',
  cookie:{maxAge:60000},
  resave:false,
  saveUnintialized:false
}));
router.use(flush());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// router.use('/static', express.static(__dirname + '/public'));
// router.set("views", path.join(__dirname, "/views"));
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
  Entry.find({}, function(err,data)
{
  entry=data;
    res.render('appoinment',{message:req.flash('message'),user:req.user,'doctor':data});
});
});
router.post('/appoinment',(req,res)=>{
  var appnment = new appoinment({
      name: req.body.name,
      doctor: req.body.doctor,
      date:req.body.date,
      desc:req.body.desc
  });

  appnment.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
        req.flash('message','Appoinment Booked');
        res.redirect('/profile/appoinment');
          console.log(result);
      }

  });

});
router.get('/bookedappoinments',(req,res)=>{
  appoinment.find({},function(err,data){
    res.render("bookedappoinments",{'appoinment':data});
  });
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
