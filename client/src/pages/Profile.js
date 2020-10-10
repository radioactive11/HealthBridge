/* eslint-disable jsx-a11y/img-redundant-alt */
// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, tokenAtom } from "../global/globalState";
import Axios from "axios";

const Appointment = () => {
	const [user, setUser] = useRecoilState(userAtom);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");
	const [fullname, setFullName] = useState(user.name);
	const [age, setAge] = useState(user.phone);
	const [phno, setPhno] = useState(user.age);
	const [address, setAddress] = useState(user.address);
	const [bloodGroup, setBloodGroup] = useState(user.bloodGroup);

	const token = useRecoilValue(tokenAtom);

	const updateProfile = () => {
		const dataTemp = {
			name: fullname,
			email,
			phone: phno,
			age,
			bloodGroup,
			address,
		};
		let updatedProfile;
		if (password === "") {
			updatedProfile = dataTemp;
		} else {
			updatedProfile = { ...dataTemp, password };
		}
		Axios.post(
			`${process.env.REACT_APP_API_URL}/patient/update`,
			updatedProfile,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
				localStorage.setItem("user", JSON.stringify(res.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="Profile">
			<div className="container">
				<div>
					<h1>Your Profile</h1>
				</div>
				<div className="main">
					{/*  APPOINTMENT  */}
					<div className="appointment-info">
						<h3>Your Profile card</h3>
						<div className="cards">
							<div className="card">
								<div className="image">
									<img
										src={require("../assets/icons/profile.png")}
										alt="Image"
									/>
								</div>
								<div className="content">
									<div className="name">{user.name}</div>
									<div className="email">{user.email}</div>
									<div className="box">
										<div className="box1"></div>
										<div className="box2"></div>
										<div className="box3"></div>
									</div>
									<div className="more-details">
										<div className="age">
											<strong>Age</strong> : {user.age}
										</div>
										<div className="bg">
											<strong>Blood Group</strong> :{" "}
											{user.bloodGroup}
										</div>
										<div className="address">
											<strong>Addres </strong> :{" "}
											{user.address}
										</div>
										<div className="phone">
											<strong>Contact </strong>:{" "}
											{user.phone}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="appointment-submit">
						<h3>Edit Profile</h3>
						<div className="appointment-form">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								id="email"
								value={email}
								defaultValue={user.email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<label htmlFor="fullname">Full Name</label>
							<input
								type="text"
								id="fullname"
								value={fullname}
								onChange={(e) => setFullName(e.target.value)}
							/>
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
							<label htmlFor="address">New Password</label>
							<input
								type="text"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className="helper-text">
								<p>Leave Empty if do not want to change</p>
							</div>
							<button
								className="primary"
								onClick={() => updateProfile()}>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Appointment;
