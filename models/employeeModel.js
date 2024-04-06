const asyncHandler = require("express-async-handler");
const db = require('../services/db')

const createEmployeeTable = asyncHandler(async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            address TEXT NOT NULL,
            mobile VARCHAR(255) NOT NULL UNIQUE,
            is_manager BOOLEAN DEFAULT FALSE,
            team_id INT,
            role VARCHAR(255) NOT NULL
        )
    `)
    console.log('Employees table created or already exists.');
})


module.exports = createEmployeeTable;
