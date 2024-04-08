const asyncHandler = require("express-async-handler");
const db = require('../services/db');

const removeManager = asyncHandler(async function (teamId) {
    try {
        await db.query('UPDATE teams SET manager_id = NULL WHERE id = ?', [teamId]);
        console.log('Manager removed from team successfully.');
        return {};
    } catch (error) {
        throw error;
    }
});

const removeisManager = asyncHandler(async function (teamId) {
    try {
        await db.query("UPDATE employees SET is_manager = 0 WHERE team_id = ? and is_manager = 1 and role = 'employee'", [teamId]);
        console.log('employer removed from manager successfully.');
        return {};
    } catch (error) {
        throw error;;
    }
});

const removeEmployerFromTeam = asyncHandler(async function (teamId) {
    try {
        await db.query("UPDATE employees SET team_id = NULL WHERE team_id = ? and is_manager = 0 and role = 'employee'", [teamId]);
        console.log('employer removed from team successfully.');
        return {};
    } catch (error) {
        throw error;
    }
});

const removeManagerFromOldTeam = asyncHandler(async function (managerId) {
    try {
        const [result] = await db.query("select * from employees WHERE id = ? and role = 'employee'", [managerId]);
        console.log(result)
        if(result.team_id && result.is_manager){
            await db.query('UPDATE teams set manager_id = NULL where id = ?',[result.team_id])
        }
        console.log('manager removed from the team successfully.');
        return {};
    } catch (error) {
        throw error;
    }
});

module.exports = {removeManager,removeisManager,removeEmployerFromTeam,removeManagerFromOldTeam};
