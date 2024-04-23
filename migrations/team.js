    const asyncHandler = require("express-async-handler");
    const db = require('../services/db')
    
    const createTeamTable = asyncHandler(async () => {
        await db.query(`
            CREATE TABLE IF NOT EXISTS teams (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                manager_id INT,
                FOREIGN KEY (manager_id) REFERENCES employees(id)
            )
        `);
        console.log('Teams table created or already exists.');
    })
    
    
    module.exports = createTeamTable;
    