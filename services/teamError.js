const asyncHandler = require("express-async-handler");
const teamError = asyncHandler(async function(req,res,next){
    const {name} = req.body;
    const errors = {} 

    //checking present
    if(!name){
        res.status(400);
        errors["name"] = "name is mandatory field"
    }

    if(res.statusCode == 400){
        throw new Error(JSON.stringify(errors))
    }

    //checking validations
    if (name.length > 255 || name.length < 5) {
        errors["name"] = `length of the team name should be in between 5 and 255`
    } 
    
    if (Object.keys(errors).length > 0) {
        res.status(400);
        throw new Error(JSON.stringify(errors))
    }
    next();
})

const teamSearchError = asyncHandler(async function(req,res,next){
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



module.exports = {teamError,teamSearchError}
