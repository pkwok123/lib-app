const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const items = require("./routes/api/items");

// Bodyparser Middleware
app.use(express.json());

//Connect to Mongo
mongoose.connect("mongodb://localhost/libapp", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("MongoDB Connected...");
  app.listen(port, () =>
    console.log(`Listening on Port ${port}, Saved: ${Date()}`)
  );
});

// Use Routes
app.use("/api/items", items);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
  // Notes
  //res.sendFile("index.html",{root:path.join(__dirname, "../public")});
  //res.sendFile(__dirname + "/public/index.html") only if public/index is in the same directory as server
});
