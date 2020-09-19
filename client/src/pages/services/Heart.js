import React, { useState } from "react";
import Axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../global/globalState";

const Cancer = () => {
	const token = useRecoilValue(tokenAtom);
	const [result, setResult] = useState(null);

	const [age, setAge] = useState(null);
	const [bp, setBp] = useState(null);
	const [hbr,setHbr] = useState(null);
	const [chol, setChol] = useState(null);
	const [sex, setSex] = useState(null);

	const getResults = () => {
		Axios.post(`${process.env.REACT_APP_API_URL}/predict/heart`, {
				age,
				bp,
				hbr,
				chol,
				sex
			},{
			headers: {
				Authorization: "Bearer " + token,
			},
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
						Patients can know the health of their heart by providing very basic details.
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
					<label htmlFor="hbr">Heart Beat Rate</label>
					<input
						type="text"
						id="hbr"
						value={hbr}
						onChange={(e) => setHbr(e.target.value)}
					/>

					<label htmlFor="sex">Sex</label>
					<input
						type="text"
						id="sex"
						value={sex}
						onChange={(e) => setSex(e.target.value)}
					/>

					<button className="primary" onClick={() => getResults()}>
						Book
					</button>
				</div>
				<div className="result">
					<h3>{result && result.heart_status}</h3>
				</div>
			</div>
		</div>
	);
};

export default Cancer;
