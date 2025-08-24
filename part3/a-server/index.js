const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(cors());
// app.use(morgan("tiny"));
app.use(express.static("dist"));//check dist folder and run static files
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




let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Sudesh moteh",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Sushil Bishowkarma",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<div>
   <p>Phonebook has info for ${persons.length} people</p>
   <p>${new Date().toString()}<p>
   </div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const personId = request.params.id;
  const reqData = persons.find((p) => p.id === personId);
  if (!reqData) {
    response.status(404).json("Data not found");
  }
  response.json(reqData);
});

app.delete("/api/persons/:id", (request, response) => {
  const perId = request.params.id;

  persons = persons.filter((p) => p.id !== perId);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const data = request.body;

  if (!data.name) {
    return response.status(400).send({ error: "name is missing" });
  }
  if (!data.number) {
    return response.status(400).send({ error: "number is missing" });
  }

  const dName = persons.find((p) => p.name === data.name);
  if (dName) {
    return response.status(409).send({ error: "name must be unique" });
  }

  const newData = {
    id: String(Math.floor(Math.random() * 1000)),
    name: data.name,
    number: data.number,
  };

  persons.push(newData);
  response.json(newData);
});

app.listen(process.env.PORT, () => console.log("The server is running", process.env.PORT));
