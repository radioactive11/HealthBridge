const Donor = require("../models/Donor");

module.exports.signup = (req,res) => {
    const {name,bloodGroup,phone,age,address} = req.body;
    const donor = new Donor({
        name,
        bloodGroup,
        phone,
        age,
        address
    })

    donor.save()
    .then((donor) => {
        res.status(200).json(donor);
    }).catch((err) => {
        res.status(422).json(err);
    })
}

module.exports.getAllDonors = (req,res) => {
    Donor.find({})
    .then((donors) => {
        res.status(200).json(donors);
    }).catch((err) => {
        res.status(422).json(err);
    })
}