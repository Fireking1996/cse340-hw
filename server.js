/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
// server.js

// *******************************
// Required Resources
// *******************************
const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config()

// Controllers
const baseController = require("./controllers/baseController")

// Routes
const inventoryRoute = require("./routes/inventoryRoute")

// *******************************
// Express Settings
// *******************************
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static Files
app.use(express.static(path.join(__dirname, "public")))

// Parse POST Body
app.use(express.urlencoded({ extended: true }))

// *******************************
// Routes
// *******************************

// Index route — Home page
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)

// 404 Page
app.use((req, res) => {
  res.status(404).render("errors/404", { title: "Page Not Found" })
})

// *******************************
// Server
// *******************************
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})