async function getInventoryByClassificationId(
  classification_id
) {
  const sql = `
    SELECT *
    FROM inventory
    WHERE classification_id = $1
  `
  const data =
    await pool.query(sql, [classification_id])

  return data.rows
}