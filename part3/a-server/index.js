const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(cors());
// app.use(morgan("tiny"));
app.use(express.static("dist")); //check dist folder and run static files
require("dotenv").config();

const Person = require("./models/person");
// Create a custom token to log request body
morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

// Use morgan with 'tiny' + custom token
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
      // console.error(error.message);
      // response
      //   .status(500)
      //   .send({ error: "something went wrong with database" });
    });
});

// app.get("/info", (request, response) => {
//   response.send(
//     `<div>
//    <p>Phonebook has info for ${persons.length} people</p>
//    <p>${new Date().toString()}<p>
//    </div>`
//   );
// });

app.get("/api/persons/:id", (request, response, next) => {
  const personId = request.params.id;
  Person.findById(personId)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
      // response.status(404).json("Data not found", err)
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const perId = request.params.id;
  Person.findByIdAndDelete(perId)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const data = request.body;

  // if (!data.name) {
  //   return response.status(400).send({ error: "name is missing" });
  // }
  // if (!data.number) {
  //   return response.status(400).send({ error: "number is missing" });
  // }
  Person.findOne({ name: data.name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(400).json({ error: "name must be unique" });
    }
  });

  const person = new Person({
    name: data.name,
    number: data.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
      // console.log("Error to post data", error);
    });
});

const errorHandler = (error, request, response, next) => {
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
  }
 
  next(error);
};

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log("The server is running", process.env.PORT)
);
