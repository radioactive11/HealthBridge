const mongoose = require("mongoose");
const schema = mongoose.Schema;

const donorSchema = new schema({
    name : {
        type : String
    },
    bloodGroup : {
        type : String
    },
    phone : {
        type : Number
    },
    address : {
        type : String
    }
})

const Donor = mongoose.model("Donor",donorSchema);

module.exports = Donor;