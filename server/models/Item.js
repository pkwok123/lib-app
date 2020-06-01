const mongoose = require("mongoose");

//Create Item Schema
const itemSchema = new mongoose.Schema({
  isbn: Array,
  call_number: String,
  rating: { amazon: String, mcc: String },
  type: String,
  cover_url: String,
  title: String,
  series: String,
  author: Array,
  subject: Array,
  publish_name: String,
  publish_year: String,
  summary: String,
});

/*Text Search ($text)*/
//Search All Fields
itemSchema.indexes({ "$**": "text" });
//Search Name & Title Fields
//  schema.index({name: 'text', 'title': 'text'});

module.exports = Item = mongoose.model("item", itemSchema);
