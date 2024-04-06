const asyncHandler = require("express-async-handler");
const db = require('../services/db');

const updateManagerAndTeam = asyncHandler(async function (employeeId, teamId) {

        try{
            if(teamId){
                let currentManager;
                [currentManager] = await db.query('SELECT id, team_id FROM employees WHERE team_id = ? AND is_manager = true', [teamId]);

                if (currentManager && currentManager.id !== employeeId) {
                    await db.query('UPDATE employees SET is_manager = false WHERE id = ?', [currentManager.id]);
                }

                await db.query('UPDATE teams SET manager_id = ? WHERE id = ?', [employeeId, teamId]);

                await db.query('UPDATE employees SET is_manager = true WHERE id = ?', [employeeId]);
                console.log('Manager and team updated successfully.');
                return {};
            }
        }catch(error){
            throw error
        }
});


module.exports = updateManagerAndTeam;