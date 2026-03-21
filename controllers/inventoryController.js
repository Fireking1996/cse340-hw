const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildVehicleDetail(req, res, next) {
  try {
    const inv_id = req.params.inv_id

    const vehicleData =
      await invModel.getVehicleById(inv_id)

    if (!vehicleData) {
      const err = new Error("Vehicle not found")
      err.status = 404
      throw err
    }

    const nav = await utilities.getNav()

    const detailHTML =
      await utilities.buildVehicleDetail(
        vehicleData
      )

    res.render("inventory/detail", {
      title:
        vehicleData.inv_make +
        " " +
        vehicleData.inv_model,
      nav,
      detailHTML,
    })
  }

  catch (error) {
    next(error)
  }
}

module.exports = {
  buildVehicleDetail,
}

async function triggerError(
  req,
  res,
  next
) {
  try {

    throw new Error(
      "Intentional 500 error"
    )

  }

  catch (error) {
    next(error)
  }
}