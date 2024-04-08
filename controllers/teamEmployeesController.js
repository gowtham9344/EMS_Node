const asyncHandler = require("express-async-handler");
const db = require('../services/db')

//@desc Get particular team Employees
//@route GET /teams/:id/employees
//@access private
const getEmployees = asyncHandler(async function(req,res){
    try{
        result = await db.query("select id,name,email,mobile,address,team_id,is_manager from employees where role = 'employee' and team_id = ?",[req.params.id])
    }catch(error){
        res.status(500);
        throw error;
    }

    res.status(200).json(result)
})

//@desc  Get manager details
//@route GET /teams/:id/employees/manager
//@access private
const getManager = asyncHandler(async function(req,res){
    try{
        result = await db.query("select id,name,email,mobile,address,team_id,is_manager from employees where role = 'employee' and team_id = ? and is_manager = true",[req.params.id])
    }catch(error){
        res.status(500);
        throw error;
    }

    res.status(200).json(result)
})

module.exports = {getEmployees,getManager}