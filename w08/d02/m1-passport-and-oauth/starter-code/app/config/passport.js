var User = require('../models/user');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var OAuth = require('../secrets.js');
// console.log(OAuth);


module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({
    clientID : OAuth.google.clientID,
    clientSecret : OAuth.google.clientSecret,
    callbackURL : OAuth.google.callbackURL
  },
  function(access_token, refresh_token, profile, done){
    process.nextTick(function (){
      User.findOne({ 'google.id' : profile.id }, function(err, user) {
        if (err) 
          return done(err);
        if (user) {
          // if theres a user, log them in
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.google.id = profile.id;
          newUser.google.access_token = access_token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;

          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }))


  passport.use('facebook', new FacebookStrategy({
    // change if not configured in your bash rc
    // clientID        : process.env.FACEBOOK_API_KEY,
    // clientSecret    : process.env.FACEBOOK_API_SECRET,
    clientID        : OAuth.fb.clientID,
    clientSecret    : OAuth.fb.clientSecret,
    callbackURL     : 'http://localhost:3000/auth/facebook/callback',
    enableProof     : true,
    profileFields   : ['name', 'emails']
  }, function(access_token, refresh_token, profile, done) {

    // // Use this to see the information returned from Facebook
    // console.log(profile)

    process.nextTick(function() {

      User.findOne({ 'fb.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();
          newUser.fb.id           = profile.id;
          newUser.fb.access_token = access_token;
          newUser.fb.firstName    = profile.name.givenName;
          newUser.fb.lastName     = profile.name.familyName;
          newUser.fb.email        = profile.emails[0].value;

          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser);
          });
        }

      });
    });
  }));

  passport.use(new GitHubStrategy({
      clientID        : OAuth.gh.clientID,
      clientSecret    : OAuth.gh.clientSecret,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(access_token, refresh_token, profile, cb, done) {

      process.nextTick(function() {

        User.findOne({ 'gh.id' : profile.id }, function(err, user) {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          } else {

            var newUser = new User();
            newUser.gh.id           = profile.id;
            newUser.gh.access_token = access_token;
            newUser.gh.name         = profile.name;
            // newUser.gh.email        = profile.emails[0].value;

            newUser.save(function(err) {
              if (err)
                throw err;

              return done(null, newUser);
            });
          }

        });
      });
    }))


  }