const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userauthentication=new Schema({
  username:String,
  googleid:String
});
const user=mongoose.model('usernamepassword',userauthentication);
module.exports=user;
