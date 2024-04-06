const asyncHandler = require("express-async-handler");
const db = require('../services/db');

const makeEmployeeManager = asyncHandler(async function(employer_id, team_id) {
    console.log("teams")
    try {
        await db.query(`UPDATE employees SET is_manager = true, team_id = ? WHERE id = ?`, [team_id, employer_id]);
        console.log('Manager updated successfully.');
        return {};
    } catch(error) {
        throw error;
    }
});


const makeEmployeer = asyncHandler(async function(employer_id, team_id) {
    try {
        await db.query(`UPDATE employees SET team_id = ? WHERE id = ?`, [team_id, employer_id]);
        console.log('employer updated successfully.');
        return {};
    } catch(error) {
        throw error;
    }
});


module.exports = {makeEmployeeManager,makeEmployeer};