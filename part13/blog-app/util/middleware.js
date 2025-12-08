const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { User, Session } = require("../models"); //  Import User and Session

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

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const rawToken = authorization.substring(7); // Extract raw token

    try {
      req.decodedToken = jwt.verify(rawToken, SECRET);
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }

    const user = await User.findByPk(req.decodedToken.id);

    // Check 1: User existence and 'disabled' status
    if (!user || user.disabled) {
      return res.status(401).json({ error: "user access revoked" });
    }

    // Check 2: Server-Side Session check
    const session = await Session.findOne({
      where: {
        userId: user.id,
        token: rawToken,
      },
    });

    if (!session) {
      // This fails if the user logged out or the token was revoked
      return res.status(401).json({ error: "session expired or revoked" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  // Attach user object to request for convenience in controllers
  req.user = user;
  next();
};

module.exports = {
  errorhandler,
  tokenExtractor,
};
