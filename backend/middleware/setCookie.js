const crypto = require("crypto");

function setCookie(req, res, next) {
  let guestId = req.cookies.guestId;
  const isProduction = process.env.NODE_ENV === 'production'

  if (!guestId) {
    guestId = crypto.randomUUID();
    res.cookie("guestId", guestId, {
      httpOnly: true,
      secure: true,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 900000,
    });
  }
  req.guestId = guestId;
  next();
}

module.exports = { setCookie };
