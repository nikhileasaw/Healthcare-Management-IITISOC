const router=require('express').Router();
const bodyParser = require("body-parser");
const session=require("express-session");
const flush=require("connect-flash");
const patientProfile = require('../models/patientprofile');
const Entry = require('../models/entry');
const appoinment=require('../models/appoinment');
const user = require('../models/user');
var multer = require("multer");
const storage = multer.memoryStorage()
router.use(session({
  secret:'secret',
  cookie:{maxAge:60000},
  resave:false,
  saveUnintialized:false
}));
router.use(flush());
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
    patientProfile.find({"email":req.user.email}, function(err,data){
      profile=data;
  res.render('patientprofile',{user:req.user,'profile':data}) });
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
      desc:req.body.desc,

  })

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
var patientprofile= new patientProfile({
      email:req.user.email,
      dob:req.user.dob,
      alergies:req.user.alergy,
      permenantmedication:req.user.permed

    })
    patientprofile.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
          res.redirect('/profile');
            console.log(result);
        }
      });

});


  /*patientprofile.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result);
          res.redirect('/profile');
      }
    })}
    else
    {
      patientProfile.update({email:req.body.email,
      dob: req.body.dob,
      alergies: req.body.alergy,
      permenantmedication: req.body.permed});
      res.redirect('/profile');
    }

});
});*/
module.exports=router;
