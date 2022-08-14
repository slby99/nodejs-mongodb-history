const db = require("../models");
const History = db.history; //getting the mongoose object
//const History = require("../models/history.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.location) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
      // Create a History
      const history = new History({
        location: req.body.location,
        date: req.body.date,
        time: req.body.time 
      });
      // Save History in the database
      history
        .save(history)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the History."
          });
        });
};
// Retrieve all Histories from the database.
exports.findAll = (req, res) => {
    // const location = req.query.location;
    // var condition = location ? { location: { $regex: new RegExp(location), $options: "i" } } : {};
    History.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving histories."
        });
      });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    History.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found History with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving History with id=" + id });
      });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      History.findByIdAndUpdate(
        id, 
        req.body, 
        { useFindAndModify: false }
        )
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update History with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "History was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating History with id=" + id
          });
        });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    History.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete History with id=${id}. Maybe History was not found!`
          });
        } else {
          res.send({
            message: "History was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete History with id=" + id
        });
      });
};
// Delete all Histories from the database.
exports.deleteAll = (req, res) => {
    History.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Histories were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all histories."
      });
    });
};


