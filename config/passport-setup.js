const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const localStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const user = require('../models/user');
const admin = require('../models/admin');
const flash=require('connect-flash');
const validPassword = require('../lib/passwordUtilities').validPassword;
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  //the first user is the userschema
  user.findById(id).then((user) => {
    done(null, user);
  });
});
const customFields = {
  usernameField: 'uname',
  passwordField: 'pw'
};
const verifyCallback = (username, password, done) => {
  admin.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
    if (!user.validPassword(password, user.hash, user.salt)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    return done(null, user);
  });

}
const strategy = new localStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.use(
  new GoogleStrategy({
    //options for the google strat
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //check if user exits
    if (profile._json.hd === "iiti.ac.in") {
      user.findOne({
        googleid: profile.id
      }).then((currentUser) => {
        if (currentUser) {
          console.log('user is:', currentUser);
          done(null, currentUser);
        } else {
          new user({
            username: profile.displayName,
            googleid: profile.id,
            email: profile._json.email
          }).save().then((newUser) => {
            console.log('new user created' + newUser);
            done(null, newUser);
          });

        }
      })
    } else {
      done(new Error("Invalid host domain"));
    }
  })
);
