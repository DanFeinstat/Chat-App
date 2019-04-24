const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const GeneralSchema = new Schema({
  message: { type: String, trim: true, required: true },
  userId: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model(`General`, GeneralSchema);
