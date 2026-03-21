const getNav = require("./navigation").getNav

function buildVehicleDetail(vehicle) {

  const price =
    new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    ).format(vehicle.inv_price)

  const mileage =
    vehicle.inv_miles.toLocaleString()

  return `

<div class="vehicle-detail">

  <img
    src="${vehicle.inv_image}"
    alt="${vehicle.inv_make} ${vehicle.inv_model}"
  >

  <div class="vehicle-info">

    <h2>
      ${vehicle.inv_year}
      ${vehicle.inv_make}
      ${vehicle.inv_model}
    </h2>

    <p>
      <strong>Price:</strong>
      ${price}
    </p>

    <p>
      <strong>Mileage:</strong>
      ${mileage} miles
    </p>

    <p>
      <strong>Color:</strong>
      ${vehicle.inv_color}
    </p>

    <p>
      ${vehicle.inv_description}
    </p>

  </div>

</div>
`
}

function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
}

module.exports = {
  buildVehicleDetail,
  getNav,
  handleErrors,
}