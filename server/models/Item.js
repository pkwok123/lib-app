const mongoose = require("mongoose");

/* Create Item Schema */

const isbnSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  available: { type: String, required: true },
});

const ratingSchema = new mongoose.Schema({
  amazon: { type: String, required: true },
  mcc: { type: String, required: true },
});

const itemSchema = new mongoose.Schema({
  isbn: {
    type: [isbnSchema],
    required: true,
  },
  call_number: String,
  rating: {
    type: ratingSchema,
    required: true,
  },
  type: { type: String, required: true },
  cover_url: { type: String, required: true },
  title: { type: String, required: true },
  series: { type: String, required: true },
  author: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return array.every((e) => typeof e === "string");
      },
    },
  },
  subject: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return array.every((e) => typeof e === "string");
      },
    },
  },
  publish_name: { type: String, required: true },
  publish_year: { type: String, required: true },
  summary: { type: String, required: true },
});

/* Create Indexes */

// Text Search ($text)
itemSchema.index({ "$**": "text" }); // Search All Fields

// Search Name & Title Fields
// schema.index({name: 'text', 'title': 'text'});

module.exports = Item = mongoose.model("item", itemSchema);
