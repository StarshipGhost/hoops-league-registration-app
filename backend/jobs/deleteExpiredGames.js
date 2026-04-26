const cron = require("node-cron");
const GameEvent = require("../models/GameEvent");
const { logEvents } = require("../middleware/logger");
const { convert12to24 } = require("../utils/convertTime");

const startCleanupExpiredGamesJob = () => {
  cron.schedule("*/60 * * * *", async () => {
    try {
      const now = new Date();
      const options = { timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit" };
      const todayDate = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
      const currentTime = now.toLocaleTimeString("en-CA", {...options, hour12: false}); // "HH:MM"

      const todayGames = await GameEvent.find({ date: todayDate });
      const expiredToday = todayGames.filter((g) => {
        console.log(convert12to24(g.end));
        return convert12to24(g.end) <= currentTime;
      });

      const pastGames = await GameEvent.find({ date: { $lt: todayDate } });
      const allExpired = [...expiredToday, ...pastGames];

      if (allExpired.length > 0) {
        const ids = allExpired.map((g) => g._id);
        await GameEvent.deleteMany({ _id: { $in: ids } });
        console.log(`[CRON] Deleted ${allExpired.length} expired game(s):`, ids);
      }
    } catch (err) {
      console.error("[CRON] Error during cleanup:", err);
      logEvents(`CRON error: ${err.message}`, "cronErrLog.log");
    }
  });
};

module.exports = { startCleanupExpiredGamesJob };
