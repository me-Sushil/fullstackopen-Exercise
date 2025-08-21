const express = require("express");
const app = express();
app.use(express.json());

const person = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Sudesh moteh", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Sushil Bishowkarma", 
      "number": "39-23-6423122"
    }
]


app.get("/api/persons", (request, response)=>{
    response.json(person);
})


app.get("/info", (request, response)=>{
response.send(
   `<p>Phonebook has info for ${person.length} people</p>`
)
})

const PORT = 3001;
app.listen(PORT);
console.log("The server is running", PORT);