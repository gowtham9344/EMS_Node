const asyncHandler = require("express-async-handler");
const {makeEmployeeManager,makeEmployeer} = require("../services/managerUpdateTeam");
const { removeisManager, removeEmployerFromTeam,removeManagerFromOldTeam } = require("../services/removeManager");
const db = require('../services/db');

//@desc Get all teams
//@route GET /teams
//@access private
let result;

const getTeams = asyncHandler(async function(req,res){
    try{
        result = await db.query(`SELECT teams.id as id, teams.name AS name, teams.manager_id, employees.name AS manager_name
        FROM teams
        LEFT JOIN employees ON teams.manager_id = employees.id order by teams.name`)
        console.log(result)
    }catch(error){
        res.status(500)
        throw error
    }

    res.status(200).json(result)
})

//@desc create new team
//@route POST /teams
//@access private
const createTeam = asyncHandler(async function(req,res){
    const {name, manager_id,employer_ids} = req.body;

    const errors = {} 

    result = await db.query(`select * from teams where name = ?`,[name])

    if(result.length > 0){
        errors.name = "team name already taken";
    }

    if (Object.keys(errors).length > 0) {
        res.status(400);
        throw new Error(JSON.stringify(errors))
    }


    try{
        if (manager_id) {
            await removeManagerFromOldTeam(manager_id)
            result = await db.query(`INSERT INTO teams (name, manager_id) VALUES (?, ?)`, [name, manager_id]);
            await makeEmployeeManager(manager_id,result.insertId)
        } else {
            result = await db.query(`INSERT INTO teams (name, manager_id) VALUES (?, NULL)`, [name]);
        }

        if (employer_ids && employer_ids.length > 0) {
            for (const employerId of employer_ids) {
                await makeEmployeer(employerId, result.insertId);
            }
        }
    }catch(error){
        res.status(500)
        throw error
    }
    res.status(200).json([{message:"team created succesfully"}])
})

//@desc get particular team
//@route GET /teams/:id
//@access private
const getTeam = asyncHandler(async function(req,res){
    try{
        result = await db.query(`select * from teams where id = ?`,[req.params.id])
    }
    catch(error){
        res.status(500)
        throw error
    }
    res.status(200).json(result)
})

//@desc update particular team
//@route PATCH /teams/:id
//@access private
const updateTeam = asyncHandler(async function(req,res){
    const {name, manager_id,employer_ids} = req.body;

    const errors = {} 

    result = await db.query(`select * from teams where name = ? and id != ?`,[name,req.params.id])

    if(result.length > 0){
        errors.name = "team name already taken";
    }

    if (Object.keys(errors).length > 0) {
        res.status(400);
        throw new Error(JSON.stringify(errors))
    }

    try{
        if (manager_id) {
            await removeManagerFromOldTeam(manager_id)
            await removeisManager(req.params.id);
            result = await db.query(`UPDATE teams SET name = ?, manager_id = ? WHERE id = ?`, [name, manager_id, req.params.id]);
            await makeEmployeeManager(manager_id,req.params.id)
        } else {
            await removeisManager(req.params.id);
            result = await db.query(`UPDATE teams SET name = ?, manager_id = NULL WHERE id = ?`, [name, req.params.id]);
        }

        await removeEmployerFromTeam(req.params.id);

        if (employer_ids && employer_ids.length > 0) {
            for (const employerId of employer_ids) {
                await makeEmployeer(employerId, req.params.id);
            }
        }
    }
    catch(error){
        res.status(500)
        throw error
    }
    res.status(200).json([{message:"team updated succesfully"}])
})

//@desc delete particular team
//@route DELETE /teams/:id
//@access private
const deleteTeam = asyncHandler(async function(req,res){

    if(req.user.role !== "admin"){
        res.status(403)
        throw new Error("user didn't have permission to delete any team")
    }

    try{
        await removeisManager(req.params.id)
        await removeEmployerFromTeam(req.params.id)
        await db.query(`DELETE FROM teams WHERE id = ?`, [req.params.id]);
    }catch(error){
        res.status(500)
        throw error
    }
    res.status(200).json([{message:"teams deleted successfully"}])
})

//@desc search teams
//@route GET /teams/search
//@access private
const searchTeams = asyncHandler(async function(req,res){
    const { key } = req.query;
    const data = `%${key}%`;

    try{
        result = await db.query(`
        SELECT teams.id as id, teams.name AS name, teams.manager_id, employees.name AS manager_name
        FROM teams
        LEFT JOIN employees ON teams.manager_id = employees.id where teams.name LIKE ? order by teams.name`, [data])
    }catch(error){
        res.status(500)
        throw error
    }
    res.status(200).json(result)
})

module.exports = {getTeams, createTeam, getTeam, updateTeam, deleteTeam, searchTeams};