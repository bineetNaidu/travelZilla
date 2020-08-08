const passport = require("passport");
const GoogleStategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.use(
    new GoogleStategy(
        {
            // options for the stategy
            callbackURL: "/auth/google/redirect",
            clientID: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        (accessToken, refreshToken, profile, done) => {
            let { id, displayName } = profile;
            let { picture, given_name } = profile._json;
            // check if user already exists
            User.findOne({ googleId: id }).then((currentUser) => {
                if (currentUser) {
                    // already have user
                    done(null, currentUser);
                } else {
                    // if not, create a new user to out db
                    // create a new user
                    new User({
                        username: displayName,
                        googleId: id,
                        avatar: picture,
                        firstName: given_name,
                    })
                        .save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
