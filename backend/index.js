require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const path = require('path');
const { logger, logEvents } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const { setCookie } = require("./middleware/setCookie");
const cookieParser = require("cookie-parser");
const { requireAdmin } = require("./middleware/requireAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/dbConnect");
const mongoose = require("mongoose");
const GameEvent = require("./models/GameEvent");

const distPath = path.join(__dirname, '..', 'frontend', 'dist')

app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(express.static(distPath));
app.use(cookieParser());
connectDB();
const PORT = process.env.PORT || 3000

app.use(setCookie);

app.get("/", (req, res) => {
  return res.sendFile(path.join(distPath, 'index.html'));
});

app.get("/guest", (req, res) => {
  return res.status(200).json({ guestId: req.guestId });
});

app.get("/schedule", async (req, res, next) => {
  const schedule = await GameEvent.find({});
  return res.status(200).json(schedule);
});

app.get("/schedule/:id", async (req, res, next) => {
  const id = req.params.id;
  const game = await GameEvent.findById({ _id: id });
  if (game) {
    return res.status(200).json(game);
  }
  return res.status(404).json({ error: "game not found" }).end();
});

app.patch("/schedule/:id", async (req, res) => {
  const isEmpty = (data) => !data.length;
  const { date, start, end, location, capacity, openRegistrations } = req.body;
  const id = req.params.id;
  const game = await GameEvent.findById({ _id: id });
  if (!game) {
    return res.status(404).json({ error: "game not found" });
  }
  if (isEmpty(date) || isEmpty(start) || isEmpty(end) || !location || capacity < game.registeredPlayers || isNaN(capacity)) {
    return res.status(400).json({ error: "All fields are required" });
  }
  game.date = date;
  game.start = start;
  game.end = end;
  game.location = location;
  game.capacity = capacity;
  game.openRegistrations = openRegistrations;

  const updatedGame = await game.save();
  return res.status(201).json(updatedGame);
});

app.post("/schedule", async (req, res) => {
  const isEmpty = (data) => !data.length;
  const game = req.body;
  if (isEmpty(game.date) || isEmpty(game.start) || isEmpty(game.end) || !game.location || isNaN(game.capacity)) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const gameObject = { ...game, registeredPlayers: [] };
  const newGame = await GameEvent.create(gameObject);
  if (newGame) {
    return res.status(201).json(newGame).end();
  }
  return res.status(400).json({ message: "Invalid game data received" });
});

app.delete("/schedule/:id", async (req, res) => {
  const id = req.params.id;
  const game = await GameEvent.findByIdAndDelete({ _id: id });
  return res.status(200).json({ message: `${game} with ID ${game.id} deleted` });
});

app.post("/schedule/:id/register", async (req, res) => {
  const id = req.params.id;
  const game = await GameEvent.findById({ _id: id });
  if (!game) {
    return res.status(404).json({ error: "game not found" });
  }
  const { firstName, status, registrationTime } = req.body;
  if (!firstName || !status) {
    return res.status(400).json({ error: "firstName and status are required" });
  }
  const alreadyRegistered = game.registeredPlayers.some((player) => player.guestId === req.guestId);
  if (alreadyRegistered) {
    return res.status(409).json({ error: "this client is already registered for this game" });
  }
  if (game.registeredPlayers.length >= game.capacity) {
    return res.status(400).json({ error: "this game is already full" });
  }
  const newRegisteredPlayer = {
    guestId: req.guestId,
    firstName,
    status,
    registrationTime,
  };

  game.registeredPlayers.push(newRegisteredPlayer);
  await game.save();
  return res.status(200).json(newRegisteredPlayer).end();
});

app.delete("/schedule/:id/register/:playerId", async (req, res) => {
  const id = req.params.id;
  const playerId = req.params.playerId;
  const game = await GameEvent.findById({ _id: id });
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const playerIndex = game.registeredPlayers.findIndex((player) => player.guestId === playerId);
  game.registeredPlayers.splice(playerIndex, 1);

  await game.save();
  return res.status(201).json(game).end();
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "15m" });

  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie("admin_token", token, {
      httpOnly: true,
      secure: isProduction, // true in production with HTTPS
      sameSite: isProduction ? "none" : "lax",
    })
    .status(200)
    .json({ message: "Logged in successfully" });
});

app.post("/admin/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production'
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: isProduction, // true in production with HTTPS
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/admin/me", requireAdmin, (req, res) => {
  res.json({ isAdmin: true });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`server listens to port ${PORT}`));
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});
