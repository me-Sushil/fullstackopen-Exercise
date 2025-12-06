const errorhandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "ReferenceError") {
    return res.status(400).json({ error: error.message });
  }
  // Sequelize validation error
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  }
  // Sequelize unique constraint error
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "Duplicate value not allowed" });
  }
  // Sequelize database error
  if (error.name === "SequelizeDatabaseError") {
    return res.status(500).json({ error: "Database error" });
  }

  // Default fallback
  return res.status(500).json({ error: "Something went wrong" });
};
module.exports = {
  errorhandler,
};
