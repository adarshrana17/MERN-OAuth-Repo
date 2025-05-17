import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

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
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  generateTokenAndRedirect
);

// ✅ Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  generateTokenAndRedirect
);

// ✅ GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  generateTokenAndRedirect
);

export default router;
