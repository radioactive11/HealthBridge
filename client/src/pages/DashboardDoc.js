import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { userAtom, tokenAtom } from "../global/globalState";

const DashboardDoc = ({ history }) => {
	const token = useRecoilValue(tokenAtom);
	const [user, setUser] = useRecoilState(userAtom);

	//State
	const [symptoms, setSymptoms] = useState("");
	const [medicine, setMedicine] = useState("");
	const [comments, setComments] = useState("");
	const [current, setCurrent] = useState("");

	const givePrescription = (pID, objID) => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/prescription/give`,
			{
				patientId: pID,
				symptoms,
				medicine,
				objID,
				comments,
				date: Date.now(),
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res.data, "give pres");
				// setUser(res.data);
				// localStorage.setItem("user", JSON.stringify(res.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		Axios.get(`${process.env.REACT_APP_API_URL}/appointment/upcoming`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				setUser(res.data);
				localStorage.setItem("user", JSON.stringify(res.data));
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const toggleCurrent = (_id) => {
		if (current === _id) {
			setCurrent("");
		} else {
			setCurrent(_id);
		}
	};
	return (
		<div className="DashboardDoc">
			<div className="container">
				<h1>Welcome Doctor</h1>
				<h3>Your Appointments</h3>
				<div className="cards">
					{user.appointments &&
						user.appointments.map((appointment) => (
							<div className="card" key={appointment._id}>
								<div className="head">
									Appointment No :{" "}
									{appointment.patient.substring(14)}
								</div>
								<div className="content">
									<h4></h4>
									<p>Symptopms : {appointment.symptoms}</p>
								</div>

								<div className="box">
									<div className="box1"></div>
									<div className="box2"></div>
									<div className="box3"></div>
								</div>

								<div className="prescribe-input">
									<div className="edit-prescribe">
										<div className="head">Prescribe</div>{" "}
										<img
											onClick={() =>
												toggleCurrent(appointment._id)
											}
											src="https://img.icons8.com/cotton/2x/edit.png"
											alt="Edit Icon"
										/>
									</div>
									{appointment._id === current && (
										<React.Fragment>
											<label>Symptoms</label>
											<input
												type="text"
												value={symptoms}
												onChange={(e) =>
													setSymptoms(e.target.value)
												}
											/>
											<label>Medicine</label>
											<input
												type="text"
												value={medicine}
												onChange={(e) =>
													setMedicine(e.target.value)
												}
											/>
											<label>Comments</label>
											<input
												type="text"
												value={comments}
												onChange={(e) =>
													setComments(e.target.value)
												}
											/>
											<button
												className="primary"
												onClick={() =>
													givePrescription(
														appointment.patient,
														appointment._id
													)
												}>
												Update
											</button>
										</React.Fragment>
									)}
								</div>
								<div className="box">
									<div className="box1"></div>
									<div className="box2"></div>
									<div className="box3"></div>
								</div>
								{appointment.prescription && (
									<React.Fragment>
										<div className="head">Prescribed</div>
										<div className="prescribed">
											<div className="presc">
												<strong>Symptoms</strong> :{" "}
												{
													appointment.prescription
														.symptoms
												}{" "}
											</div>
											<div className="presc">
												<strong>Medicine</strong> :{" "}
												{
													appointment.prescription
														.medicine
												}{" "}
											</div>
											<div className="presc">
												<strong>Comments</strong> :{" "}
												{
													appointment.prescription
														.comments
												}{" "}
											</div>
										</div>
									</React.Fragment>
								)}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default DashboardDoc;
