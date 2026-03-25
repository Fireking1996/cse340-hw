/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 /* ******************************************
 * Primary server file
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use(static)

// IMPORTANT: enables vehicle navigation
app.use("/inv", inventoryRoute)

// Index route
app.get("/", function(req, res) {
  res.render("index", {
    title: "Home"
  })
})

/* ***********************
 * Error Handler
 *************************/
app.use(async (err, req, res, next) => {

  console.error(err.stack)

  try {
    const nav = await utilities.getNav()

    res.status(err.status || 500).render(
      "errors/error",
      {
        title: "Error",
        message: err.message,
        nav,
      }
    )
  } catch (error) {
    res.status(500).send("Server Error")
  }

})

/* ***********************
 * Server Information
 *************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || "localhost"

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})