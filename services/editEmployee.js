const asyncHandler = require("express-async-handler");
const db = require('../services/db');
const updateManagerAndTeam = require("./updateManager");

const editEmployee = asyncHandler(async function(employeeId, newTeamId,isManager) {

        try{
            const [currentTeam] = await db.query('SELECT team_id, is_manager FROM employees WHERE id = ?', [employeeId]);
            
            if (currentTeam && currentTeam.is_manager) {

                if (newTeamId && currentTeam.team_id !== newTeamId) {
                    await db.query('UPDATE teams SET manager_id = NULL WHERE id = ?', [currentTeam.team_id]);
                }
                else if(isManager == false){
                    await db.query('UPDATE teams SET manager_id = NULL WHERE id = ?', [currentTeam.team_id]);
                }
            }     
            
            if(isManager){
                await updateManagerAndTeam(employeeId,newTeamId)
            }
            console.log('Employee updated successfully.');
            return {};
        }catch(error){
            throw error
        }
});

module.exports = editEmployee