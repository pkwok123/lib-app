const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

// Item.syncIndexes();

/* Item Model */

// @route GET api/items
// @desc Get All Items
// @access public

router.get("/", (req, res) => {
  Item.find({}).then((item) => res.json(item));
});

// @route GET api/items/:query
// @desc Get All Items that Match the Query
// @access public

router.get("/search", (req, res) => {
  if (req.query.hasOwnProperty("q")) {
    //Query Search
    Item.find(
      { $text: { $search: req.query.q } },
      { score: { $meta: "textScore" } }
    ) //Fix? Score is based on frequency not
      .sort({ score: { $meta: "textScore" } })
      .then((item) => res.json(item));
  } else {
    //Advance Search: Old method can change to text query if need be
    var queryValues = Object.values(req.query);
    var queryKeys = Object.keys(req.query);
    for (x in queryValues) {
      //Adding RegExp Cases to req.query
      queryValues[x] = queryValues[x].trim();
      req.query[queryKeys[x]] = new RegExp(queryValues[x], "ig");
    }
    Item.find({ $or: [req.query] }).then((item) => res.json(item));
  }
});

// @route GET api/items/item
// @desc Get One Item by ID
// @access public

router.get("/item", (req, res) => {
  Item.findById(req.query._id).then((item) => res.json(item));
});

/*// @route Post api/items/item
// @desc Post One Item by ID
// @access admin

router.post("/", (req, res) => {
  const newItem = new Item({
    isbn: req.body.isbn,
    call_number: req.body.call_number,
    rating: req.body.rating,
    type: req.body.type,
    cover_url: req.body.cover_url,
    title: req.body.title,
    series: req.body.series,
    author: req.body.author,
    subject: req.body.subject,
    publish_name: req.body.publish_name,
    publish_year: req.body.publish_year,
    summary: req.body.summary,
  });

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error Creating Item",
      })
    );
});

// @route Patch api/items/:query
// @desc Patch One Item by ID
// @access admin

router.patch("/", (req, res) => {
  Item.findByIdAndUpdate(req.query._id, req.body, {
    runValidators: true,
  })
  .then((item) => res.json(item));
  .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error Updating Item",
      })
    );
});

// @route Delete api/items/:query
// @desc Delete One Item by ID
// @access admin

router.delete("/", (req, res) => {
  Item.findByIdAndRemove(req.query._id, {
    runValidators: true,
  })
  .then((item) => res.json(item));
  .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error Deleting Item",
      })
    );
});*/

module.exports = router;

/* First Method Used for /search */
// @route GET api/items/:query
// @desc Get All Items that Match the Query
// @access public

// router.get("/search", (req, res) => {
//   var queryValues = Object.values(req.query);
//   var queryKeys = Object.keys(req.query);
//   for (x in queryValues) {
//     queryValues[x] = queryValues[x].trim();
//     req.query[queryKeys[x]] = new RegExp(queryValues[x], "ig");
//   }
//   console.dir(req.query);
//   if (req.query.hasOwnProperty("q")) {
//     //Fix? for a more concise method
//     var isbn = { isbn: req.query.q };
//     var call_number = { call_number: req.query.q };
//     var rating = {
//       rating: {
//         amazon: req.query.q,
//         mcc: req.query.q,
//       },
//     };
//     var title = { title: req.query.q };
//     var series = { series: req.query.q };
//     var author = { author: req.query.q };
//     var subject = { subject: req.query.q };
//     var publish_name = { publish_name: req.query.q };
//     var publish_year = { publish_year: req.query.q };
//     var summary = { summary: req.query.q };
//     //Fix? use text search instead?
//     Item.find({
//       $or: [
//         isbn,
//         call_number,
//         rating,
//         title,
//         series,
//         author,
//         subject,
//         publish_name,
//         publish_year,
//         summary,
//       ],
//     }).then((item) => res.json(item));
//   } else {
//     Item.find({ $or: [req.query] }).then((item) => res.json(item));
//   }
// });
