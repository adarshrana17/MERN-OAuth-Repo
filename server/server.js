import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authroute.js";
import session from "express-session";
import passport from "passport";
import configurePassport from "./config/passport.js";
import verifyToken from "./middlewares/verifyToken.js";
import cors from "cors";
import searchRouter from "./routes/searchRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // ✅ Required for JSON POST data

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/api/test-protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you're authenticated.` });
});

app.use(
  session({
    secret: process.env.JWT_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Configure strategies BEFORE routes
configurePassport(passport);

app.use("/auth", authRoutes);
app.use("/api", searchRouter);

app.listen(PORT, () => {
  console.log("Server is running an port number", PORT);
});
