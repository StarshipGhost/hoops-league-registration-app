const crypto = require("crypto");

function setCookie(req, res, next) {
  let guestId = req.cookies.guestId;

  if (!guestId) {
    guestId = crypto.randomUUID();
    res.cookie("guestId", guestId, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 900000,
    });
  }
  req.guestId = guestId;
  next();
}

module.exports = { setCookie };
