const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")
const utilities = require("../utilities")

// Vehicle detail page
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(inventoryController.buildVehicleDetail)
)

// Intentional 500 error page
router.get(
  "/trigger-error",
  utilities.handleErrors(inventoryController.triggerError)
)

module.exports = router