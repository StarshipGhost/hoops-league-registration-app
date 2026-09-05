const crypto = require("crypto");
const { getUpcomingGameEvent } = require("../utils/getUpcomingEvent");

async function setCookie(req, res, next) {
  let guestId = req.cookies.guestId;
  const isProduction = process.env.NODE_ENV === "production";

  if (!guestId) {
    const game = await getUpcomingGameEvent();
    if (!game) {
      return next();
    }
    const end = new Date(`${game.date} ${game.end}`);

    guestId = crypto.randomUUID();
    res.cookie("guestId", guestId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: end - Date.now(),
    });
  }
  req.guestId = guestId;
  next();
}

module.exports = { setCookie };
