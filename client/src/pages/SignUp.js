import React, { useState } from "react";
import Axios from "axios";

const SignUp = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullname, setFullName] = useState("");
	const [age, setAge] = useState(0);
	const [phno, setPhno] = useState(0);
	const [address, setAddress] = useState("");
	const [bloodGroup, setBloodGroup] = useState("AB+");
	const [department, setDepartment] = useState("");

	const [errors, setErrors] = useState(null);
	const [selected, setSelected] = useState("user");

	const handleSignUp = () => {
		if (selected === "user") {
			Axios.post(`${process.env.REACT_APP_API_URL}/patient/signup`, {
				name: fullname,
				email,
				phone: phno,
				age,
				bloodGroup,
				address,
				password,
			})
				.then((res) => {
					console.log(res.data);
					history.push("/login");
				})
				.catch((err) => {
					if (Array.isArray(err.response.data.errors)) {
						setErrors(err.response.data.errors);
					} else {
						setErrors([{ msg: err.response.data.error }]);
					}
				});
		} else {
			Axios.post(`${process.env.REACT_APP_API_URL}/doctor/signup`, {
				name: fullname,
				email,
				department,
				password,
			})
				.then((res) => {
					console.log(res.data);
					history.push("/login");
				})
				.catch((err) => {
					if (Array.isArray(err.response.data.errors)) {
						setErrors(err.response.data.errors);
					} else {
						setErrors([{ msg: err.response.data.error }]);
					}
				});
		}
	};

	return (
		<div className="SignUp">
			<div className="left-bar">
				<div className="top">
					<div onClick={() => history.push("/")}>
						<div className="logo">
							<h1>HealthBridge</h1>
						</div>
					</div>
					<p>
					Welcome to the Unified HealthCare Platform
					</p>
				</div>
				<img
					className="art"
					src={require("../assets/svg/doc1.svg")}
					alt="Doctor"
				/>
			</div>
			<div className="main-signup">
				<h1>Sign Up</h1>
				<div className="selector-container">
					<div className="selector">
						<button
							className="left"
							id={selected === "user" ? "selected" : ""}
							onClick={() => setSelected("user")}>
							User
						</button>
						<button
							className="right"
							id={selected === "doctor" ? "selected" : ""}
							onClick={() => setSelected("doctor")}>
							Doctor
						</button>
					</div>
				</div>
				<div className="signup-form">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="fullname">Full Name</label>
					<input
						type="text"
						id="fullname"
						value={fullname}
						onChange={(e) => setFullName(e.target.value)}
					/>
					{selected === "user" ? (
						<React.Fragment>
							<label htmlFor="phone_number">Phone Number</label>
							<input
								type="number"
								id="phone_number"
								value={phno}
								onChange={(e) => setPhno(e.target.value)}
							/>

							<label htmlFor="age">Age</label>
							<input
								type="number"
								id="age"
								value={age}
								onChange={(e) => setAge(e.target.value)}
							/>

							<label htmlFor="blood_group">Blood group</label>
							<select
								name="blood_grp"
								value={bloodGroup}
								onChange={(e) => setBloodGroup(e.target.value)}>
								<option value="AB+">AB+</option>
								<option value="AB-">AB-</option>
								<option value="A+">A+</option>
								<option value="A-">A-</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
								<option value="O+">O+</option>
								<option value="O-">O-</option>
							</select>
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<label htmlFor="department">Department</label>
							<input
								type="text"
								id="department"
								value={department}
								onChange={(e) => setDepartment(e.target.value)}
							/>
						</React.Fragment>
					)}

					<label htmlFor="pass">Password</label>
					<input
						type="password"
						id="pass"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="primary" onClick={() => handleSignUp()}>
						Sign Up
					</button>
				</div>
				{errors &&
					errors.map(({ msg }, index) => (
						<div key={index} className="error">
							{msg}
						</div>
					))}
			</div>
		</div>
	);
};

export default SignUp;
