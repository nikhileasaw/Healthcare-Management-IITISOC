const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const patientprofile=new Schema({
  email:String,
  dob:Date,
  alergies:String,
  permenantmedication:String,

});
const patientProfile = mongoose.model('patientprofiles',patientprofile);
module.exports=patientProfile;
