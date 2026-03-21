router.get(
  "/detail/:inv_id",
  utilities.handleErrors(
    inventoryController.buildVehicleDetail
  )
)

router.get(
  "/trigger-error",
  utilities.handleErrors(
    inventoryController.triggerError
  )
)