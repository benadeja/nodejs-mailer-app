const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

//1 arg means we are fetching data from the model, 2 args means we are pushing data into the model
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);

      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile id
        return done(null, existingUser);
      }
      // we don't have a user with the ID, make a new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
