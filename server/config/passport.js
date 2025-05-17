import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

export default function configurePassport(passport) {
  // ✅ Google Strategy (already done)
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      verifyOAuthUser("google")
    )
  );

  // ✅ Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "emails", "photos"],
      },
      verifyOAuthUser("facebook")
    )
  );

  // ✅ GitHub Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
        scope: ["user:email"],
      },
      verifyOAuthUser("github")
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    User.findById(id)
      .then((user) => done(null, user))
      .catch(done)
  );
}

// ✅ Reusable function for all strategies
function verifyOAuthUser(provider) {
  return async (accessToken, refreshToken, profile, done) => {
    try {
      const oauthId = profile.id;
      const email = profile.emails?.[0]?.value || "";
      const name = profile.displayName || "No Name";
      const photo = profile.photos?.[0]?.value || "";

      let user = await User.findOne({ oauthId });

      if (!user) {
        user = await User.create({
          oauthId,
          provider,
          name,
          email,
          photo,
        });
      }

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  };
}
