/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
/* ******************************************
 * Primary server file
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
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

// IMPORTANT — this enables vehicle navigation
app.use("/inv", inventoryRoute)

// Index route
app.get("/", function(req, res) {
  res.render("index", {
    title: "Home"
  })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

/* ***********************
 * Error Handler
 *************************/
app.use(async (err, req, res, next) => {

  console.error(err.stack)

  const nav =
    await utilities.getNav()

  res.status(err.status || 500).render(
    "errors/error",
    {
      title: "Error",
      message: err.message,
      nav,
    }
  )
})