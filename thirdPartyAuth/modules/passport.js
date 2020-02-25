var passport = require("passport");
var githubStrategy = require("passport-github").Strategy;

passport.use(
  new githubStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "/auth/github/callback"
    },

    function(refrehToken, accessToken, profile, done) {
      var user = {
        name: profile.displayName,
        username: profile.username,
        eamil: profile._json.email,
        photo: profile._json.avatar_url
      };

      console.log(user);
      done(null, user);
    }
  )
);
