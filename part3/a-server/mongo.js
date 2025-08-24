const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://phonebookApp:${password}@cluster0.8gckl7e.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log("error while saving person", err);
      mongoose.connection.close();
    });
} else {
  Person.find({})
    .then((person) => {
      console.log("phonebook:");
      person.forEach((p) => console.log(`${p.name} ${p.number}`));
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log("error while getting person", err);
      mongoose.connection.close();
    });
}
