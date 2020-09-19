const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

module.exports.bookAppointment = (req, res) => {
	//Fields to be passed
	// symptoms,appointmentDate,department,doctor
	console.log(req.body);
	Patient.findById(req.patient._id).then((patient) => {
		//Saving the appointment in the appointment field of patient Schema
		const { symptoms, appointmentDate, department, doctor } = req.body;
		patient.appointment = {
			symptoms,
			appointmentDate: new Date(appointmentDate),
			department,
			doctor,
		};
		console.log("Patient : ", patient);

		patient
			.save()
			.then((patient) => {
				console.log("Patient Saved : ", patient);
				Doctor.findOne({
					name: req.body.doctor,
				})
					.then((doctor) => {
						doctor.appointments.push({
                            patient: patient._id,
                            ...req.body
                        });
						doctor
							.save()
							.then(() => {
								res.status(200).json(patient);
							})
							.catch((err) => {
								res.status(422).json(err);
							});
					})
					.catch((err) => {
						console.log("Couldnt find doc");
					});
			})
			.catch((err) => {
				console.log("Couldnt Save Patient", err);
				res.status(422).json(err);
			});
	});
};

//Upcoming appointments for doctor
module.exports.upcomingAppointments = (req, res) => {
	Doctor.findById(req.doctor._id).then((doctor) => {
		res.status(200).json(doctor)
	});
};