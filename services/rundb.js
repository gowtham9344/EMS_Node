const createTeamTable = require('../migrations/team')
const createEmployeeTable = require('../migrations/employee')
const foreignKeyAdd = require('./foreignKeyAdd')
const asyncHandler = require("express-async-handler")

const intialTable = asyncHandler(async function (){
    try{
        await createEmployeeTable();
        await createTeamTable();
        await foreignKeyAdd();
    }catch(error){
        throw error
    }
});

module.exports = intialTable;