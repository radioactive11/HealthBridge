const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({
            error : "No headers provided"
        })
    }

    //Get the token from the authorization bearer
    const token = authorization.replace("Bearer ","");

    //Verifying the user token for accessing the protected pages

    jwt.verify(token,secret,(err,payload) => {
        if(err) {
            res.status(422).json({
                error : "You must be logged in"
            })
        }
        else {
            //Payload given at the time of signing in 
            const {_id} = payload;

            Doctor.findById({
                _id
            }).then((doctorData) => {
                req.doctor = doctorData;
                next();
            })
        }

    })
}
