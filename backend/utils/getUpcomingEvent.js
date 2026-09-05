const GameEvent = require("../models/GameEvent");
const { convert12to24 } = require("./convertTime");

function getEventEndDate(event) {
  const [year, month, day] = event.date.split("-");
  const end = new Date(`${year}-${month}-${day} ${event.end}`);

  return end;
}

async function getUpcomingGameEvent() {
  const events = await GameEvent.find();

  const now = new Date();

  return events
    .map((event) => ({
      event,
      endDate: getEventEndDate(event),
    }))
    .filter(({ endDate }) => endDate > now)
    .sort((a, b) => a.endDate - b.endDate)
    .at(0)?.event;
}

module.exports = { getUpcomingGameEvent };
