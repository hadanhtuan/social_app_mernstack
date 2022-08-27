const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.js')
const postRoutes = require('./routes/posts.js')

const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config()

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);

app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));










