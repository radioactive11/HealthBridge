const Doctor = require("../models/Doctor");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports.signup = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors : errors.array()
        })
    }

    const {name,email,department,password} = req.body;

    //Checking if the patient is already signed up or not
    Doctor.findOne({
        email
    }).then((doctor) => {
        if(doctor) {
            res.status(400).json({
                errors : [{msg : "Email already exists"}]
            })
        }
    })

    //If not save the new User
    bcrypt.hash(password,10).then((hashedPass) => {
        const newDoctor = new Doctor({
            name,
            email,
            department,
            password : hashedPass
        })

        newDoctor.save()
        .then((savedDoctor) => {
            res.status(200).json({
                savedDoctor
            });
        }).catch((err) => {
            res.status(400).json({
                errors : [{msg : "Error while registering the patient"}]
            })
        })
    })

}

module.exports.signin = (req,res) => {
    const {email,password} = req.body;
    
    Doctor.findOne({
        email
    }).then((doctor) => {
        if(!doctor) {
            return res.status(422).json({
                errors : [{msg : "Invalid credentials"}]
            })
        }

        bcrypt.compare(password,doctor.password)
        .then((isMatch) => {

            //If password matches then issue a token depending upon the payload given
            if(isMatch) {
                const token = jwt.sign({
                    _id : doctor._id
                },secret)
                
                const {_id,email,department,name,type} = doctor;

                res.json({
                    token,
                    doctor : {_id,email,department,name,type}
                })
            }

            else {
                res.json({
                    errors : [{msg : "Invalid Credentials"}]
                })
            }

        }).catch((err) => {
            console.log(err);
        })
    })
}

module.exports.dashboard = (req,res) => {
    console.log(req.doctor,"doctor id");
    Doctor.findById(req.doctor._id)
    .then((doctor) => {
        res.status(200).json(doctor);
    }).catch((err) => {
        res.status(422).json(err);
    })
}