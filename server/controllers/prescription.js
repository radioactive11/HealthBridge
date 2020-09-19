const Patient = require("../models/Patient");
const { spawn } = require("child_process");
const path = require("path");
const Doctor = require("../models/Doctor");

//Doctor gives prescription
module.exports.givePrescription = (req, res) => {
	const { patientId, objID, symptoms, medicine, comments } = req.body;

	Patient.findById(patientId).then((patient) => {
		patient.appointment.prescription = {
			symptoms,
			medicine,
			comments,
			date: Date.now(),
		};
		patient
			.save()
			.then((patient) => {
				Doctor.update(
					{ "appointments._id": objID },
					{
						$set: {
							"appointments.$.prescription": {
								symptoms,
								medicine,
								comments,
								date: Date.now(),
							},
						},
					},
					function (err, model) {
						if (err) {
							console.log(err);
							return res.send(err);
						}
						return res.json(model);
					}
				);
			})
			.catch((err) => {
				console.log("Coudnt save Patient");
				res.status(422).json(err);
			});
	});
};

//Patient gets prescription
module.exports.getPrescription = (req, res) => {
	Patient.findById(req.patient._id)
		.then((patient) => {
			res.status(200).json(patient);
		})
		.catch((err) => {
			res.status(422).json(err);
		});
};

//Doctor will prescribe generic name like paracetamol
// and by using scraper we will get back

// module.exports.getPrescribedMedicine = (req, res) => {
// 	Patient.findById(req.patient._id).then((patient) => {
// 		var process = spawn("python3", [
// 			pathlocation,
// 			patient.appointment.prescription.medicine,
// 		]);
// 		console.log("ok");
// 		process.stdout.on("data", (data) => {
// 			console.log(data, "ok");
// 			res.send(JSON.parse(data.toString()));
// 		});
// 	});
// };

// //Extra feature just get brand names by giving the medicine's generic name
// module.exports.getBrandNames = (req, res) => {
// 	const { medicine } = req.body;
// 	var process = spawn("python3", [pathlocation, medicine]);
// 	console.log("ok");
// 	process.stdout.on("data", (data) => {
// 		console.log(data, "ok");
// 		res.send(JSON.parse(data.toString()));
// 	});
// };