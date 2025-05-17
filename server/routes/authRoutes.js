import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// Utility: Generate JWT and redirect
const generateTokenAndRedirect = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
};

// ✅ Google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  generateTokenAndRedirect
);

// ✅ Facebook
authRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  generateTokenAndRedirect
);

// ✅ GitHub
authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  generateTokenAndRedirect
);

export default authRouter;
