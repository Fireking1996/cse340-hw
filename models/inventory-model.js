async function getVehicleById(inv_id) {
  try {
    const sql =
      `
      SELECT *
      FROM inventory
      WHERE inv_id = $1
      `

    const data =
      await pool.query(sql, [inv_id])

    return data.rows[0]
  }

  catch (error) {
    console.error(
      "getVehicleById error",
      error
    )
  }
}