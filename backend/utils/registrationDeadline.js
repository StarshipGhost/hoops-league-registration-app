const { convert12to24 } = require("./convertTime");

const registrationDeadline = (gameDate, gameTime) => {
  const gameTimeString = `${gameDate}T${convert12to24(gameTime)}`;
  return new Date(gameTimeString).setHours(new Date(gameTimeString).getHours() - 2)
};

module.exports = { registrationDeadline };
