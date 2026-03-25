const invModel = require("../models/inventory-model")

/* ***************************
 * Build Navigation
 *************************** */
async function getNav() {
  let data = await invModel.getClassifications()

  let list = "<ul>"

  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach((row) => {
    list += `
      <li>
        <a href="/inv/type/${row.classification_id}"
           title="See our inventory of ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>
    `
  })

  list += "</ul>"

  return list
}

/* ***************************
 * Build Vehicle Detail
 *************************** */
function buildVehicleDetail(vehicle) {

  const price = new Intl.NumberFormat(
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

/* ***************************
 * Error Handler Wrapper
 *************************** */
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
}
module.exports = {
  buildByClassificationId,
  buildVehicleDetail,
  triggerError,
}