const createTeamTable = require('../models/teamModel')
const createEmployeeTable = require('../models/employeeModel')
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