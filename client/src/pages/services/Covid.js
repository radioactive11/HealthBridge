import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../global/globalState";
import Axios from "axios";

const Cancer = () => {
	const token = useRecoilValue(tokenAtom);
	const [name, setName] = useState("");
	const [bloodGroup, setBloodGroup] = useState("B+");
	const [contact, setContact] = useState("");
	const [address, setAddress] = useState("");
	const [age, setAge] = useState(0);

	const [results, setResults] = useState(null);

	const handleSubmit = () => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/donor/signup`,
			{ name, bloodGroup, phone: contact, age, address },
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				setResults([...results, res.data]);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		Axios.get(`${process.env.REACT_APP_API_URL}/donor`)
			.then((res) => {
				console.log(res.data);
				setResults(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	return (
		<div className="Covid">
			<div className="container">
				<div>
					<h1>Covid Plasma Donation</h1>
					<p className="content">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Odit at et aliquam omnis obcaecati voluptas, deserunt
					</p>
				</div>
				<div className="main">
					<div className="plasma-info">
						<h3>Plasma Info</h3>
						<div className="scroll-view">
							<div className="cards">
								{results &&
									results
										.map(
											({
												name,
												address,
												_id,
												phone,
												bloodGroup,
											}) => (
												<div className="card">
													<h4
														className="bg"
														key={_id}>
														{bloodGroup}
													</h4>
													<div className="content">
														<p className="name">
															Name: {name}
														</p>
														<p className="contact">
															Contact : {phone}
														</p>
														<p className="address">
															Address : {address}
														</p>
													</div>
												</div>
											)
										)}
							</div>
						</div>
					</div>
					<div className="plasma-submit">
						<h3>Submit your info</h3>
						<div className="plasma-form">
							<label htmlFor="Name">Full Name</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
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
							<label htmlFor="contact">Contact</label>
							<input
								type="text"
								id="contact"
								value={contact}
								onChange={(e) => setContact(e.target.value)}
							/>
							<label htmlFor="age">Age</label>
							<input
								type="number"
								id="age"
								value={age}
								onChange={(e) => setAge(e.target.value)}
							/>
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>

							<button
								className="primary"
								onClick={() => handleSubmit()}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cancer;
