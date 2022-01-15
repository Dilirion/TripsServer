const db = require("../models");
const Trip = db.trips;
const Op = db.Sequelize.Op;

function createCondition(filtrCondition, filtrColumn, filtrValue) {
  let whereCondition = null
  if (filtrColumn == 'date') {
    switch (filtrCondition) {
      case "equals":
        console.log(1)
        whereCondition = {date: {[Op.eq]: filtrValue}}
        break    
      case "greater": 
        whereCondition = {date: {[Op.gt]: filtrValue}}
        break
      case "less": 
        whereCondition = {date: {[Op.lt]: filtrValue}}
        break
    }    
  }
  else if (filtrColumn == 'title') {
    switch (filtrCondition) {
      case "equals":
        console.log(1)
        whereCondition = {title: {[Op.eq]: filtrValue}}
        break    
      case "contains": 
        whereCondition = {title: {[Op.iLike]: `%${filtrValue}%`}}
        break
    }    
  }
  else if (filtrColumn == 'number') {
    switch (filtrCondition) {
      case "equals":
        console.log(1)
        whereCondition = {number: {[Op.eq]: filtrValue}}
        break    
      case "greater": 
        whereCondition = {number: {[Op.gt]: filtrValue}}
        break
      case "less": 
        whereCondition = {number: {[Op.lt]: filtrValue}}
        break
    }    
  }
  else if (filtrColumn == 'distance') {
    switch (filtrCondition) {
      case "equals":
        console.log(1)
        whereCondition = {distance: {[Op.eq]: filtrValue}}
        break    
      case "greater": 
        whereCondition = {distance: {[Op.gt]: filtrValue}}
        break
      case "less": 
        whereCondition = {distance: {[Op.lt]: filtrValue}}
        break
    }    
  }
  return whereCondition
}

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!!"
    });
    console.log(req.body)
    return;
  }
  const trip = {
    date: req.body.date,
    title: req.body.title,
    number: req.body.number ? req.body.number : 1,
    distance: req.body.distance ? req.body.distance : 0
  };
  Trip.create(trip)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Trip."
    });
  });
};

exports.findAll = (req, res) => {
  const orderColumn = req.query.orderColumn ? req.query.orderColumn : 'title'
  const filtrColumn = req.query.filtrColumn, filtrCondition = req.query.filtrCondition, filtrValue = req.query.filtrValue

  let whereCondition = createCondition(filtrCondition, filtrColumn, filtrValue)
  Trip.findAll({
    where: whereCondition,
    order: [
      [orderColumn, 'ASC'],
    ],
    limit: req.query.limit,
    offset: req.query.offset
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Trips."
    });
  });
};


 exports.countAll = (req, res) => {
  const filtrColumn = req.query.filtrColumn, filtrCondition = req.query.filtrCondition, filtrValue = req.query.filtrValue
  
  let whereCondition = createCondition(filtrCondition, filtrColumn, filtrValue)
  Trip.count({where: whereCondition})
  .then(data => {
    res.send({count: data});    
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Trips."
    });
  });
} 
