const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema(
  {
    price: {
      type: Number,
      required: true
    },
    location: {
      neighborhood: {
        type: String,
        required: true
      },
      address: {
        houseNumber: {
          type: Number,
          required: true
        },
        street: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        zip: {
          type: Number,
          required: true
        }
      },
      subdivision: {
        type: String
      },
      school: {
        district: {
          type: String
        },
        elementary: {
          type: String
        },
        middle: {
          type: String
        },
        high: {
          type: String
        }
      }
    },
    description: {
      type: String,
      required: true
    },
    forSale: {
      type: Boolean
    },
    forRent: {
      type: Boolean
    },
    priceDrop: {
      type: Date
    },
    openHouse: {
      type: Date
    },
    interior: {
      beds: {
        type: Number
      },
      baths: {
        type: Number
      },
      masterBedLoc: {
        type: String
      },
      features: {
        // breakfast nook, elevator etc
        type: String
      },
      appliances: {
        type: String
      },
      fireplaceFeats: {
        type: String
      },
      fireplaceLoc: {
        type: String
      },
      numFireplaces: {
        type: Number
      },
      basementType: {
        type: String
      }
    },
    exterior: {
      garage: {
        type: Boolean
      },
      garageType: {
        type: String
      },
      outdoorFeats: {
        type: String
      },
      parkingFeats: {
        type: String
      },
      horses: {
        type: Boolean
      },
      horseFacilities: {
        type: String
      }
    },
    size: {
      acres: {
        type: Number
      },
      sqftTotal: {
        type: Number
      },
      sqftBasement: {
        type: Number
      },
      sqftAboveGrd: {
        type: Number
      },
      sqftFinished: {
        type: Number
      }
    },
    property: {
      type: {
        // land, attached single family etc
        type: String
      },
      numUnits: {
        type: Number
      },
      floorsInUnit: {
        type: Number
      },
      directionFaces: {
        type: String
      },
      view: {
        type: String
      },
      yearBuilt: {
        type: Number
      }
    },
    laundry: {
      availability: {
        type: String
      },
      location: {
        type: String
      }
    },
    construction: {
      builderName: {
        type: String
      },
      buildingType: {
        type: String
      },
      materials: {
        type: String
      },
      details: {
        type: String
      },
      architecture: {
        type: String
      },
      flooring: {
        type: String
      },
      houseType: {
        type: String
      },
      cooling: {
        type: String
      },
      otherHVAC: {
        type: String
      }
    },
    buyerTourRegion: {
      type: String
    },
    terms: {
      type: String
    },
    financing: {
      type: String
    },
    approvalCond: {
      type: String
    },
    HOA: {
      hasHOA: {
        type: Boolean
      },
      HOAfee: {
        type: Number
      }
    },
    taxAmount: {
      type: Number
    },
    restrictions: {
      type: String
    },
    partialOwnership: {
      type: {
        type: String
      },
      amount: {
        type: Number
      }
    },
    sellerType: {
      type: String
    },
    siteFeatures: {
      // adjacent to park, corner lot etc
      type: [String]
    },
    link: {
      type: String
    },
    MLSNumber: {
      type: String
    },
    group: {
      // RE/MAX etc
      type: String
    },
    dateAdded: {
      type: Date,
      default: Date.now
    },
    newToSite: {
      type: Boolean
    },
    active: {
      type: Boolean
    },
    // photos: {
    //   data: Buffer,
    //   contentType: String
    // }
    photos: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

const Property = mongoose.model("properties", PropertySchema);

module.exports = Property;
