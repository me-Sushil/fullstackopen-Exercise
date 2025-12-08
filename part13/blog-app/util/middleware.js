const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const errorhandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "ReferenceError") {
    return res.status(400).json({ error: error.message });
  }

  // Sequelize validation error  <-- EMAIL validation will come here
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: error.errors.map((e) => e.message),
    });
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

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log(authorization, "this is authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};
module.exports = {
  errorhandler,
  tokenExtractor,
};
