const mongoose = require("mongoose");
const schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema.Types;

const doctorSchema = new schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    department : {
        type : String
    },
    type : {
        type : String,
        default : "doctor"
    },
    appointments : [{ 
        appointmentId : {
            type : Number
        },
        patient : {
            type : ObjectId,
            ref : "Patient"
        },
        symptoms : {
            type : String
        },
        appointmentDate : {
            type : Date
        },
        department : {
            type : String
        },
        doctor : {
            type : String,
        },
        prescription : {
            symptoms : {
                type : String
            },
            medicine : {
                type : String
            },
            comments : {
                type : String
            },
            date : {
                type : Date
            }
        }
    }],
    password : {
        type : String
    }
})

const Doctor = mongoose.model("Doctor",doctorSchema);

module.exports = Doctor;