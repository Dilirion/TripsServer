module.exports = app => {
    const Trips = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    router.post("/", Trips.create)  
 
    router.get("/", Trips.findAll)

    router.get("/count", Trips.countAll)
  
    app.use('/api/trips', router);
  };