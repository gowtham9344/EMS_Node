const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config()
const intialTable = require('./services/rundb.js')

const app = express()
const port = process.env.PORT || 8000;

app.use(express.json())

app.use("/employees",require('./routes/employeeErrorRoutes.js'))
app.use("/employees",require('./routes/employeeRoutes'))
app.use("/teams",require('./routes/teamErrorRoutes.js'))
app.use("/teams",require('./routes/teamRoutes'))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is listening on the port , ${port}`)
})
