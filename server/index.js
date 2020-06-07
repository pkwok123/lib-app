const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("../config/keys").mongoURI;
const app = express();
const path = require("path");
const items = require("./routes/api/items");
const PORT = process.env.PORT || 8080;

// Bodyparser Middleware
app.use(express.json());

// Connect to Mongo
// LocalURI: "mongodb://localhost/libapp"
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("MongoDB Connected...");
  app.listen(PORT, () =>
    console.log(`Listening on Port ${PORT}, Saved: ${Date()}`)
  );
});

// Use Routes
app.use("/api/items", items);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public", "index.html"));
//   // Notes
//   //res.sendFile("index.html",{root:path.join(__dirname, "../public")});
//   //res.sendFile(__dirname + "/public/index.html") only if public/index is in the same directory as server
// });
