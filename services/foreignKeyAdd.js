const asyncHandler = require("express-async-handler");
const db = require('../services/db')

const foreignKeyAdd = asyncHandler(async ()=>{
    try{
        await db.query(`
            ALTER TABLE employees
            ADD CONSTRAINT fk_team_id
            FOREIGN KEY (team_id) REFERENCES teams(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);
        console.log('Foreign key constraint added successfully.');
    }catch(error){
        throw new Error("foreign key cannot be created")
    }
});

module.exports = foreignKeyAdd;