const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorhandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    // Invalid ObjectId format (e.g., malformed MongoDB _id)
    return response.status(400).send({ error: "malformatted id" });

  } else if (error.name === "ValidationError") {
    // Mongoose schema validation failed (invalid or missing data)
    return response.status(400).json({ error: error.message });

  } else if (error.name === "MongoServerError" && error.code === 11000) {
    // Unique constraint violation (duplicate value for a field marked as unique)
    return response.status(400).json({ error: "Duplicate field value" });
  }else if(error.name === "Error"){
    return response.status(400).json({error: error.message});
  }else if(error.name === "StrictPopulateError"){
    return response.status(400).json({error: error.message});
  }else if(error.name === "TypeError"){
    return response.status(400).json({error: error.message});
  }else if(error.name === "ReferenceError"){
    return response.status(400).json({error: error.message});
  }else if(error.name === "JsonWebTokenError"){
    return response.status(400).json({error:error.message});
  }else if(error.name === "SyntaxError"){
    return response.status(400).json({error : error.message});
  }

  next(error);
};


const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  
  next();
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorhandler,
  tokenExtractor
}