const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const user = require('../models/user')
passport.serializeUser((user,done)=>{
  done(null,user.id);
});
passport.deserializeUser((id,done)=>{
  //the first user is the userschema
  user.findById(id).then((user)=>{
    done(null,user);
  });
});
passport.use(
  new GoogleStrategy({
    //options for the google strat
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //check if user exits
    if(profile._json.hd==="iiti.ac.in")
    {
    user.findOne({
      googleid: profile.id
    }).then((currentUser) => {
      if (currentUser) {
 console.log('user is:',currentUser);
 done(null,currentUser);
      } else {
        new user({
          username: profile.displayName,
          googleid: profile.id,
          email:profile._json.email
        }).save().then((newUser) => {
          console.log('new user created' + newUser);
          done(null,newUser);
        });

      }
    })
  }
  else{
    done(new Error("Invalid host domain"));
  }
  })
);
