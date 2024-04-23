const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config()
const intialTable = require('./services/rundb.js');
const initialSeed = require('./services/initialSeed.js');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 8001;

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

app.use("/users",require('./routes/userRoutes.js'))
app.use("/employees",require('./routes/employeeRoutes'))
app.use("/teams",require('./routes/teamRoutes'))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is listening on the port , ${port}`)
})
