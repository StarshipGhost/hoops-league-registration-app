const mongoose = require("mongoose");

const gameEventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  location: { name: { type: String, required: true }, link: { type: String, required: true } },
  registeredPlayers: [
    {
      guestId: { type: String, required: true },
      firstName: { type: String, required: true },
      status: { type: String, required: true },
      registrationTime: { type: String, required: true },
    },
  ],
  capacity: { type: Number, required: true },
  openRegistrations: { type: Boolean },
});

gameEventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("GameEvent", gameEventSchema);
