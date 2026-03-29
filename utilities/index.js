// utilities/index.js
const model = require("../models/inventory-model"); // or classification-model.js



/* ***************************
 * Build Navigation
 * ************************** */
const Util = {}

Util.getNav = async function () {
  let data

  try {
    data = await model.getClassifications()
  } catch (error) {
    console.error("Error fetching classifications for nav: ", error)
    data = []
  }

  let nav = "<nav>"
  nav += "<ul>"

  // REQUIRED: Home link first
  nav += '<li><a href="/">Home</a></li>'

  if (Array.isArray(data) && data.length > 0) {
    data.forEach(classification => {
      nav += `
        <li>
          <a href="/inv/type/${classification.classification_id}">
            ${classification.classification_name}
          </a>
        </li>`
    })
  }

  nav += "</ul>"
  nav += "</nav>"

  return nav
}


/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid

  if (data.length > 0) {
    grid = '<ul id="inv-display">'

    data.forEach((vehicle) => {
      grid += "<li>"

      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">'

      grid +=
        '<img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" />'

      grid += "</a>"

      grid += '<div class="namePrice">'
      grid += "<hr />"
      grid += "<h2>"

      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">'

      grid += vehicle.inv_make + " " + vehicle.inv_model

      grid += "</a>"
      grid += "</h2>"

      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>"

      grid += "</div>"
      grid += "</li>"
    })

    grid += "</ul>"
  } else {
    grid =
      '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }

  return grid
}

module.exports = Util