// dependences
const express = require("express");
const router = express.Router();

// load Property model
const Property = require("../../models/Property");

// @ROUTE /api/properties/test
// @DESCRIPTION test
// @ACCESS public
router.get("/test", (req, res) => {
  res.json({ msg: "success" });
});

// @ROUTE /api/properties/
// @DESCRIPTION get all properties
// @ACCESS public
router.get("/", (req, res) => {
  Property.find()
    .then(properties => {
      res.json(properties);
    })
    .catch(err => res.json("Error: " + err));
});

router.post("/", (req, res) => {
  const newProperty = new Property({
    price: req.body.price,
    location: {
      neighborhood: req.body.neighborhood,
      address: {
        houseNumber: req.body.houseNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      }
    },
    description: req.body.description
  });

  newProperty
    .save()
    .then(property => res.json(property))
    .catch(err => res.json("Error: " + err));
});

module.exports = router;
