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

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.error(error.message);
      response
        .status(500)
        .send({ error: "something went wrong with database" });
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

app.get("/api/persons/:id", (request, response) => {
  const personId = request.params.id;
  Person.findById(personId)
    .then((person) => {
      response.json(person);
    })
    .catch((err) => response.status(404).json("Data not found", err));
});

app.delete("/api/persons/:id", (request, response) => {
  const perId = request.params.id;
  Person.findByIdAndDelete(perId)
    .then((result) => response.status(204).end())
    .catch((err) => err);
});

app.post("/api/persons", (request, response) => {
  const data = request.body;

  if (!data.name) {
    return response.status(400).send({ error: "name is missing" });
  }
  if (!data.number) {
    return response.status(400).send({ error: "number is missing" });
  }
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
      console.log("Error to post data", error);
    });
});

app.listen(process.env.PORT, () =>
  console.log("The server is running", process.env.PORT)
);
