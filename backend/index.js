const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const { setCookie } = require("./middleware/setCookie");
const cookieParser = require("cookie-parser");
const PORT = 3000;

app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(express.static("dist"));
app.use(cookieParser());

let schedule = [];

app.use(setCookie);

app.get("/guest", (req, res) => {
  res.status(200).json({ guestId: req.guestId });
});

app.get("/schedule", (req, res) => {
  res.json(schedule);
});

app.get("/schedule/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const game = schedule.find((g) => g.id === id);
  if (game) {
    return res.status(200).json(game);
  }
  return res.status(404).json({ error: "game not found" }).end();
});

app.patch("/schedule/:id", (req, res) => {
  const isEmpty = (data) => !data.length;
  const { date, start, end, location, capacity } = req.body;
  const id = parseInt(req.params.id);
  const game = schedule.find((g) => g.id === id);
  if (isEmpty(date) || isEmpty(start) || isEmpty(end) || !location || capacity < game.registeredPlayers) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const updatedGame = { ...game, date: date, start: start, end: end, location: location, capacity: capacity };
  schedule = schedule.map((game) => (game.id === id ? updatedGame : game));
  return res.status(201).json(updatedGame);
});

app.post("/schedule", (req, res) => {
  const isEmpty = (data) => !data.length;
  const game = req.body;
  const newId = schedule.length + 1;
  if (isEmpty(game.date) || isEmpty(game.start) || isEmpty(game.end) || !game.location) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newGame = { ...game, id: newId, registeredPlayers: [] };
  schedule = schedule.concat(newGame);
  return res.status(201).json(newGame).end();
});

app.delete("/schedule/:id", (req, res) => {
  const id = parseInt(req.params.id);
  schedule = schedule.filter((game) => game.id !== id);
  return res.status(200).json(schedule).end();
});

app.post("/schedule/:id/register", (req, res) => {
  const id = parseInt(req.params.id);
  const game = schedule.find((g) => g.id === id);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  const { firstName, status, registrationTime } = req.body;
  if (!firstName || !status) {
    return res.status(400).json({ error: "firstName and status are required" });
  }
  const alreadyRegistered = game.registeredPlayers.some((player) => player.guestId === req.guestId);
  if (alreadyRegistered) {
    return res.status(409).json({ error: "This client is already registered for this game" });
  }
  if (game.registeredPlayers.length >= game.capacity) {
    return res.status(400).json({ error: "This game is already full" });
  }
  const newRegisteredPlayer = {
    guestId: req.guestId,
    firstName,
    status,
    registrationTime
  };
  const updatedGame = { ...game, registeredPlayers: [...game.registeredPlayers, newRegisteredPlayer] };
  schedule = schedule.map((g) => (g.id === id ? updatedGame : g));
  return res.status(200).json(newRegisteredPlayer).end();
});

app.delete("/schedule/:id/register/:playerId", (req, res) => {
  const id = parseInt(req.params.id);
  const playerId = req.params.playerId;
  const game = schedule.find((g) => g.id === id);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  const updatedGame = {...game, registeredPlayers: game.registeredPlayers.filter((player) => player.guestId !== playerId)}
  schedule = schedule.map((game) => game.id === id ? updatedGame : game);
  return res.status(201).end()
})

app.use(errorHandler);
app.listen(PORT, () => console.log(`server listens to port ${PORT}`));
