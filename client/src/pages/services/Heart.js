import React, { useState } from "react";
import Axios from "axios";
// import { useRecoilValue } from "recoil";
// import { tokenAtom } from "../../global/globalState";

const Cancer = () => {
	// const token = useRecoilValue(tokenAtom);
	const [result, setResult] = useState(null);

	const [age, setAge] = useState(null);
	const [bp, setBp] = useState(null);
	const [fps, setFps] = useState(null);
	const [chol, setChol] = useState(null);
	const [sex, setSex] = useState(null);

	const getResults = () => {
		Axios.post(`https://eureka-heart.herokuapp.com//heart`, {
			age,
			sex,
			cp: 0,
			trestbps: 0,
			chol,
			fbs: fps,
			bps: bp,
			restecg: 0,
			thalach: 0,
			exang: 1,
			oldpeak: 1,
			slope: 1,
			ca: 1,
			thal: 1,
		})
			.then((res) => {
				console.log(res.data, "ok");
				setResult(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="Heart">
			<div className="container">
				<div>
					<h1>Heart Health Prediction</h1>
					<p className="content">
						Patients can know the health of their heart by providing
						very basic details.
					</p>
				</div>
				<div className="heart-form">
					<label htmlFor="age">Age</label>
					<input
						type="text"
						id="age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
					<label htmlFor="bp">Blood Pressure</label>
					<input
						type="text"
						id="bp"
						value={bp}
						onChange={(e) => setBp(e.target.value)}
					/>
					<label htmlFor="chol">Cholestrol</label>
					<input
						type="text"
						id="chol"
						value={chol}
						onChange={(e) => setChol(e.target.value)}
					/>
					<label htmlFor="hbr">Sugar</label>
					<input
						type="text"
						id="hbr"
						value={fps}
						onChange={(e) => setFps(e.target.value)}
					/>

					<label htmlFor="sex">Sex</label>
					<select
						name="blood_grp"
						value={sex}
						onChange={(e) => setSex(e.target.value)}>
						<option value="1">Male</option>
						<option value="0">Female</option>
					</select>
					<button className="primary" onClick={() => getResults()}>
						Get Result
					</button>
				</div>
				<div className="result">
					<h3>{result && result.result}</h3>
				</div>
			</div>
		</div>
	);
};

export default Cancer;
