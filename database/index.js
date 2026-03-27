// database/index.js

const { Pool } = require("pg")
require("dotenv").config()

/* ***************************
 * PostgreSQL Connection Pool
 * ************************** */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
})

/* ***************************
 * Export Pool
 * ************************** */
module.exports = pool