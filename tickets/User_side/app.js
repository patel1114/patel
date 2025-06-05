const express = require("express");
const path = require("path");
const session = require("express-session");
const multer = require("multer");

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const ticketController = require("./contollers/ticketController");
const { generateCaptcha, verifyCaptcha } = require("./utils/captcha");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve static files (HTML, CSS, JS, images) - Fix path
app.use(express.static(path.join(__dirname, "public")));

// Session setup
app.use(
  session({
    secret: "uzhx ntpn msnv qdcm",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Fix the root route to serve index.html directly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Fix the new-ticket route to serve index2.html directly
app.get("/new-ticket", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index2.html"));
});

// Captcha route
app.get("/captcha", generateCaptcha);

// New ticket POST route
app.post(
  "/new-ticket",
  multer({ dest: "uploads/" }).single("attachment"),
  verifyCaptcha,
  ticketController.createTicket
);

// All other routes
app.use("/", userRoutes);
app.use("/", ticketRoutes);

// Start server
const PORT = 3000; // Changed to 3000 to match your original
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});