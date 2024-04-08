const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler");
const db = require('../services/db')

const initialSeed = asyncHandler(async ()=>{
    let name = "admin"
    let email = "admin@gmail.com"
    let address = "admin address"
    let mobile = "9999999999"
    let role = "admin"
    let password_digest = await bcrypt.hash("Admin@123",10)

    try{
        const result = await db.query(`INSERT INTO employees (name, email, address, mobile, is_manager, team_id, role, password_digest)
            VALUES (?, ?, ?, ?, false, NULL, ?, ?)`,[name,email,address,mobile,role,password_digest])
        console.log('initial data is added successfully.');
    }catch(error){
        console.log(error)
        throw new Error("error in adding initial data")
    }
});

module.exports = initialSeed;
