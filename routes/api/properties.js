// dependences
const express = require("express");
const router = express.Router();

// load Property model
const Property = require("../../models/Property");

// @ROUTE GET /api/properties/test
// @DESCRIPTION test
// @ACCESS public
router.get("/test", (req, res) => {
  res.json({ msg: "success" });
});

// @ROUTE GET /api/properties/view/:id
// @DESCRIPTION get property by id
// @ACCESS public
router.get("/view/:id", (req, res) => {
  Property.findById(req.params.id)
    .then(property => {
      res.json(property);
    })
    .catch(err =>
      res.status(404).json({ propertynotfound: "Property not found" })
    );
});

// @ROUTE GET /api/properties/search
// @DESCRIPTION get properties according to search filters. if no filters, get all properties
// @ACCESS public
router.get("/search", (req, res) => {
  // build out query object according to user's search filters
  let query = {};

  for (let key in req.body) {
    query[key] = req.body[key];
  }

  // take min and max keys back out cause those aren't present in the schema, only price
  delete query.min;
  delete query.max;

  // add price to query
  if (req.body.min && req.body.max) {
    query.price = { $gte: req.body.min, $lte: req.body.max };
  } else if (req.body.min) {
    query.price = { $gte: req.body.min };
  } else if (req.body.max) {
    query.price = { $lte: req.body.max };
  }

  Property.find(query)
    .then(properties => {
      res.json(properties);
    })
    .catch(err =>
      res.status(404).json({ nopropsfound: "No properties found" })
    );
});

// @ROUTE POST /api/properties/
// @DESCRIPTION add properties to db - for dev
// @ACCESS public
router.post("/", (req, res) => {
  // flattened
  const newProperty = new Property({
    price: req.body.price,
    neighborhood: req.body.neighborhood,
    houseNumber: req.body.houseNumber,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    subdivision: req.body.subdivision,
    schoolDistrict: req.body.district,
    elementarySch: req.body.elementary,
    middleSch: req.body.middle,
    highSch: req.body.high,
    description: req.body.description,
    forSale: req.body.forSale,
    forRent: req.body.forRent,
    priceDrop: req.body.priceDrop,
    openHouse: req.body.openHouse,
    beds: req.body.beds,
    baths: req.body.baths,
    masterBedLoc: req.body.masterBedLoc,
    interiorFeatures: req.body.features,
    appliances: req.body.appliances,
    fireplaceFeats: req.body.fireplaceFeats,
    fireplaceLoc: req.body.fireplaceLoc,
    numFireplaces: req.body.numFireplaces,
    basementType: req.body.basementType,
    garage: req.body.garage,
    garageType: req.body.garageType,
    outdoorFeats: req.body.outdoorFeats,
    parkingFeats: req.body.parkingFeats,
    horses: req.body.horses,
    horseFacilities: req.body.horseFacilities,
    acres: req.body.acres,
    sqftTotal: req.body.sqftTotal,
    sqftBasement: req.body.sqftBasement,
    sqftAboveGrd: req.body.sqftAboveGrd,
    sqftFinished: req.body.sqftFinished,
    propType: req.body.propType,
    numUnits: req.body.numUnits,
    floorsInUnit: req.body.floorsInUnit,
    directionFaces: req.body.directionFaces,
    propView: req.body.view,
    yearBuilt: req.body.yearBuilt,
    laundryAvailability: req.body.availability,
    laundryLocation: req.body.location,
    builderName: req.body.builderName,
    buildingType: req.body.buildingType,
    constrMaterials: req.body.materials,
    constrDetails: req.body.details,
    architecture: req.body.architecture,
    flooring: req.body.flooring,
    houseType: req.body.houseType,
    cooling: req.body.cooling,
    otherHVAC: req.body.otherHVAC,
    buyerTourRegion: req.body.buyerTourRegion,
    terms: req.body.terms,
    financing: req.body.financing,
    approvalCond: req.body.approvalCond,
    hasHOA: req.body.hasHOA,
    HOAfee: req.body.HOAfee,
    taxAmount: req.body.HOAfee,
    restrictions: req.body.HOAfee,
    partialOwnershipType: req.body.partialOwnershipType,
    partialOwnershipAmount: req.body.partialOwnershipAmount,
    sellerType: req.body.sellerType,
    siteFeatures: req.body.siteFeatures,
    link: req.body.link,
    MLSNumber: req.body.MLSNumber,
    group: req.body.group,
    newToSite: req.body.newToSite,
    active: req.body.active,
    photos: req.body.photos
  });

  newProperty
    .save()
    .then(property => res.json(property))
    .catch(err => res.json("Error: " + err));
});

module.exports = router;
