async function buildByClassificationId(req, res, next) {
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