import React from "react";
import { useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../global/globalState";
import Axios from "axios";

const Medicine = () => {
	const token = useRecoilValue(tokenAtom);
	const [enteredName, setEnteredName] = useState("");
	const [commonNames, setCommonNames] = useState(null);

	const getBrandNames = useCallback(() => {
		Axios.post(
			`https://eureka-scrapper-radioactive11.herokuapp.com/generic_name`,
			{
				generic_name: enteredName,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res.data);
				setCommonNames(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [enteredName, token]);

	return (
		<div className="Medicine">
			<div className="container">
				<div className="top">
					<h1>Common Medicine Names</h1>
					<p>
						Making brand names of medicines available to the patient
						by providing a generic name of the medicine, which are
						far cheaper and easily available.
					</p>
				</div>

				<div className="main">
					<div className="entered-name">
						<label htmlFor="medicine">Medicine Name</label>
						<input
							type="text"
							value={enteredName}
							onChange={(e) => setEnteredName(e.target.value)}
						/>
					</div>
					<button className="primary" onClick={getBrandNames}>
						Get Results
					</button>
					{commonNames ? (
						<div className="commons">
							<label htmlFor="commons">Common Medicines</label>
							<div className="result">
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>General Price</th>
											<th>Source</th>
										</tr>
									</thead>
									<tbody>
										{commonNames.map((med) => (
											<tr>
												<td>{med.name}</td>
												<td>{med.price}</td>
												<td>{med.source}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Medicine;
