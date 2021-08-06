const mongoose=require('mongoose');
const crypto=require('crypto');
const Schema=mongoose.Schema;
const adminauthentication=new Schema({
  username:String,
  hash:String,
  salt:String,
});
adminauthentication.methods.validPassword=function(password,hash,salt){
  let hashVerify=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
  return hash==hashVerify;
}
const admin=mongoose.model('adminauthentication',adminauthentication);
module.exports=admin;
