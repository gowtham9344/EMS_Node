const asyncHandler = require("express-async-handler");
const db = require('../services/db')
const updateManagerAndTeam = require('../services/updateManager');
const editEmployee = require("../services/editEmployee");
const {removeManager} = require("../services/removeManager");
const bcrypt = require("bcrypt")

let result;

//@desc Get all employees
//@route GET /employees
//@access private
const getEmployees = asyncHandler(async function(req,res){
    try{
        result = await db.query("select id,name,email,mobile,address,team_id,is_manager from employees where role = 'employee'")
    }catch(error){
        res.status(500);
        throw error;
    }

    res.status(200).json(result)
})

//@desc create new employee
//@route POST /employees
//@access private
const createEmployee = asyncHandler(async function(req,res){
    const {name, email, address, mobile,team_id,is_manager} = req.body;
    role = "employee"
    let password = "Default@123"

    let hashedPassword = await bcrypt.hash(password,10);

    try{
        if(!team_id){
            result = await db.query(`INSERT INTO employees (name, email, address, mobile, is_manager, team_id, role, password_digest)
            VALUES (?, ?, ?, ?, false, NULL, ?, ?)`,[name,email,address,mobile,role,hashedPassword])
        }
        else{   
            result = await db.query(`INSERT INTO employees (name, email, address, mobile, is_manager, team_id, role, password_digest)
            VALUES (?, ?, ?, ?, false, ?, ?, ?)`,[name,email,address,mobile,team_id,role,hashedPassword])

            if(is_manager == true){
                await updateManagerAndTeam(result.insertId,team_id)
            }
        }
    }
    catch(error){
        res.status(500);
        throw error;
    }
    res.status(201).json({message:"employee created successfully"})
})

//@desc get particular employee
//@route GET /employees/:id
//@access private
const getEmployee = asyncHandler(async function(req,res){

    try{
        result = await db.query(`select id,name,email,mobile,address,team_id,is_manager from employees where id = ? and role = 'employee'`,[req.params.id])
    }
    catch(error){
        res.status(500);
        throw error;
    }
    res.status(200).json(result)
})


//@desc update particular employee
//@route PATCH /employees/:id
//@access private
const updateEmployee = asyncHandler(async function(req,res){
    const {name, email, address, mobile,team_id,is_manager} = req.body;

    const employeeId = req.params.id;
    
    try{
        await editEmployee(employeeId,team_id,is_manager ? true : false)
        if(team_id){
            await db.query(`
            UPDATE employees 
            SET 
                name = ?, 
                email = ?, 
                address = ?, 
                mobile = ?, 
                team_id = ?, 
                is_manager = ? 
            WHERE 
                id = ? and 
                role = 'employee'
        `, [name, email, address, mobile, team_id, is_manager ? true : false, employeeId]);
        }
        else{        
            await db.query(`UPDATE employees SET name = ?, email = ?, address = ?, mobile = ?,is_manager = false,team_id = NULL WHERE id = ? and role = 'employee'`, [name, email, address, mobile, employeeId]);
        }
    }
    catch(error){
        res.status(500);
        throw error;
    }

    res.status(200).json({message:"employee updated successfully"})
})

//@desc delete particular employee
//@route DELETE /employees/:id
//@access private
const deleteEmployee = asyncHandler(async function(req,res){

    if(req.user.role !== "admin"){
        res.status(403)
        throw new Error("user didn't have permission to delete an employee")
    }

    try{
        result = await db.query(`select * from employees where id = ${req.params.id} and role = 'employee'`)

        if(result[0].is_manager){
            await removeManager(result[0].team_id)
        }
        await db.query(`DELETE FROM employees WHERE id = ? and role = 'employee'`, [req.params.id]);
    }catch(error){
        res.status(500);
        throw error;
    }
    res.status(200).json({message:"deleted successfully"})
})

//@desc search employees
//@route GET /employees/search
//@access private
const searchEmployees = asyncHandler(async function(req,res){
    const { key } = req.query;
    const data = `%${key}%`;

    try{
        result = await db.query("SELECT id,name,email,mobile,address,team_id,is_manager FROM employees WHERE (name LIKE ? OR email LIKE ? OR mobile LIKE ? ) AND role = 'employee'", [data, data, data]);
    }catch(error){
        res.status(500)
        throw error
    }
    res.status(200).json(result)
})

module.exports = {getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee, searchEmployees};