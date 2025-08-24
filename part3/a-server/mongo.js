const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebookApp:${password}@cluster0.8gckl7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: process.argv[3],
  number: process.argv[4],
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})