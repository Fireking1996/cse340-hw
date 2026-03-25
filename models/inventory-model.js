const pool = require("../database/")

/* ***************************
 * Get all classifications
 *************************** */
async function getClassifications() {
  try {
    const sql =
      "SELECT * FROM classification ORDER BY classification_name"
    const data = await pool.query(sql)
    return data.rows
  } catch (error) {
    console.error("getClassifications error", error)
  }
}

/* ***************************
 * Get inventory by classification ID
 *************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT *
      FROM inventory
      WHERE classification_id = $1
    `
    const data = await pool.query(sql, [classification_id])
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error", error)
  }
}

/* ***************************
 * Get a single vehicle by inventory ID
 *************************** */
async function getVehicleById(inv_id) {
  try {
    const sql = `
      SELECT *
      FROM inventory
      WHERE inv_id = $1
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error", error)
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById,
}