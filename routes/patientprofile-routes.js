const router=require('express').Router();
const checkAuth=(req,res,next)=>{
  if(!req.user){
    res.redirect('/auth/login')
  }
  else{
    next();
  }
}
router.get('/',(req,res)=>{
  res.render('patientprofile',{patient:req.user});
});
module.exports=router;
