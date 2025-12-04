require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

app.get('/api/notes', async (req, res) => {
  const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  res.json(notes)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})