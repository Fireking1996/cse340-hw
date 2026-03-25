const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ***************************
 * Build inventory by classification view
 *************************** */
async function buildByClassificationId(
  req,
  res,
  next
) {
  try {
    const classification_id =
      req.params.classification_id

    const data =
      await invModel.getInventoryByClassificationId(
        classification_id
      )

    if (!data || data.length === 0) {
      const err = new Error(
        "No vehicles found for this classification"
      )
      err.status = 404
      throw err
    }

    const nav =
      await utilities.getNav()

    res.render(
      "inventory/classification",
      {
        title: "Vehicle List",
        nav,
        data,
      }
    )
  }

  catch (error) {
    next(error)
  }
}

/* ***************************
 * Build vehicle detail view
 *************************** */
async function buildVehicleDetail(
  req,
  res,
  next
) {
  try {
    const inv_id =
      req.params.inv_id

    const vehicleData =
      await invModel.getVehicleById(
        inv_id
      )

    if (!vehicleData) {
      const err =
        new Error("Vehicle not found")
      err.status = 404
      throw err
    }

    const nav =
      await utilities.getNav()

    const detailHTML =
      utilities.buildVehicleDetail(
        vehicleData
      )

    res.render(
      "inventory/detail",
      {
        title:
          vehicleData.inv_make +
          " " +
          vehicleData.inv_model,
        nav,
        detailHTML,
      }
    )
  }

  catch (error) {
    next(error)
  }
}

/* ***************************
 * Intentional 500 error
 *************************** */
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

module.exports = {
  buildByClassificationId,
  buildVehicleDetail,
  triggerError,
}