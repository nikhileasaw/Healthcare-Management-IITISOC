const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const adminauthentication=new Schema({
  username:String,
  hash:String,
  salt:String,
});
const admin=mongoose.model('adminauthentication',adminauthentication);
module.exports=admin;
