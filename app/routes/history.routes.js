module.exports = app => {
    const history = require("../controllers/history.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", history.create);
    // Retrieve all Tutorials
    router.get("/", history.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", history.findOne);
    // Update a Tutorial with id
    router.put("/:id", history.update);
    // Delete a Tutorial with id
    router.delete("/:id", history.delete);
    // Create a new Tutorial
    router.delete("/", history.deleteAll);
    app.use('/history', router);
  };