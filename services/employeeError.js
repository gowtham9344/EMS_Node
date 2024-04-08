const asyncHandler = require("express-async-handler")

const employeeError = asyncHandler(async function(req,res,next){
    if(req.user.role !== "admin"){
        res.status(403)
        throw new Error("user didn't have permission to update an employee")
    }

    const {name, email, address, mobile,team_id,is_manager} = req.body;
    const errors = {} 

    //checking present
    if(!name,!email,!address,!mobile){
        res.status(400);
        errors["name"] = "name is mandatory field"
        errors["email"] = "email is mandatory field"
        errors["address"] = "address is mandatory field"
        errors["mobile"] = "mobile is mandatory field"
        errors["password"] = "password is mandatory field"
    }

    if (is_manager && !team_id) {
        res.status(400);
        errors["team_id"] = "team_id is required when setting an employee as a manager"
    }

    if(res.statusCode == 400){
        throw new Error(JSON.stringify(errors))
    }

    //checking validations
    if (name.length > 255) {
        errors["name"] = `length of the name should not be greater than 255`
    } 

    if (!/^[a-zA-Z]+$/.test(name)) {
        res.status(400);
        errors["name"] = `name must contain only alphabets`
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        errors["email"] = "Invalid email format";
    }

    if (!/^\d{10}$/.test(mobile)) {
        errors["mobile"] = "Mobile number must contain exactly 10 digits and consist only of numbers";
    }

    if (Object.keys(errors).length > 0) {
        res.status(400);
        throw new Error(JSON.stringify(errors))
    }

    next();
})

const employeeSearchError = asyncHandler(async function(req,res,next){
    const { key } = req.query;
    const errors = {} 

    //checking present
    if(!key){
        res.status(400);
        errors["key"] = "Missing 'key' query parameter"
    }

    if(res.statusCode == 400){
        throw new Error(JSON.stringify(errors))
    }
    
    next();
})


module.exports = {employeeError, employeeSearchError}
