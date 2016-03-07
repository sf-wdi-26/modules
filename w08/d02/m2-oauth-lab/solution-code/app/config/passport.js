var User = require('../models/user');
var API_CONFIG = require('../secrets')
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('facebook', new FacebookStrategy({
    clientID        : API_CONFIG.facebook.id,
    clientSecret    : API_CONFIG.facebook.secret,
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
      clientID:     API_CONFIG.github.id,
      clientSecret: API_CONFIG.github.secret,
      callbackURL:  "http://127.0.0.1:3000/auth/github/callback"
    },
    function(access_token, refresh_token, profile, cb) {

        process.nextTick(function() {

          User.findOne({ 'fb.id' : profile.id }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, user);
            } else {

              var newUser = new User();
              newUser.gh.id           = profile.id;
              newUser.gh.access_token = access_token;
              newUser.gh.name         = profile.name;
              newUser.gh.email        = profile.emails[0].value;

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
