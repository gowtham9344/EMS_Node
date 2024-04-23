const asyncHandler = require("express-async-handler");
const db = require('../services/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//@desc login as user or admin
//@route POST /users/login
//@access public
const loginUser = asyncHandler(async function(req,res){
    const {email,password} = req.body;
    console.log(email,password)
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    

    try{

        const [result] = await db.query('SELECT * FROM employees WHERE email = ?', [email]);
        if (result && await bcrypt.compare(password, result.password_digest)) {
            const accessToken = jwt.sign({
                user: {
                    email: result.email,
                    id: result.id,
                    role: result.role
                }
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "5d"
            });

            res.status(200).json({ accessToken:accessToken,isAdmin:result.role === 'admin',id:result.id });
        } else {
            res.status(401)
            throw new Error("Invalid email or password");
        }
    }catch(error){
        res.status(500);
        throw error;
    }
})

//@desc current user info
//@route GET /users/current
//@access private
const currentUser = asyncHandler(async function(req,res){
    let result;
    if(req.user.role === "admin"){
        [result] = await db.query('SELECT id,name,email,mobile,address FROM employees WHERE id = ?', [req.user.id]);
    }
    else{
        [result] = await db.query('SELECT id,name,email,mobile,address,team_id,is_manager FROM employees WHERE id = ?', [req.user.id]);
    }
    
    res.status(200).json(result)
})


//@desc edit current user info
//@route POST /users/editUser
//@access private
const editUser = asyncHandler(async function(req,res){
    const {email,password,password_confirmation} = req.body;

    if(!email || !password || !password_confirmation){
        res.status(400);
        throw new Error("All fields are mandatory fields");
    }
    if(email !== req.user.email){
        res.status(403);
        throw new Error("Unauthorized access to edit other users password");
    }

    let errors = {}

    if (password.length < 8) {
        errors["password"] = "Password must be at least 8 characters long";
    } else if (!/[a-zA-Z]/.test(password)) {
        errors["password"] = "Password must contain at least one letter";
    } else if (!/\d/.test(password)) {
        errors["password"] = "Password must contain at least one digit";
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
        errors["password"] = "Password must contain at least one special character";
    }

    if(password !== password_confirmation){
        errors["passwordConfirmation"] = "password confirmation must be same as password";
    }

    if (Object.keys(errors).length > 0) {
        res.status(400);
        throw new Error(JSON.stringify(errors))
    }

    let password_digest = await bcrypt.hash(password,10);

    try{
        await db.query('UPDATE employees set password_digest = ? where email = ?', [password_digest,email]);
    }catch(error){
        throw error
    }
    res.status(200).json({message:"password updated successfully"})
})

module.exports = {loginUser, currentUser,editUser}
