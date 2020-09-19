import React, { useState } from "react";
import Axios from "axios";
import Dropzone from "react-dropzone";

const Pneumonia = () => {
	const [result, setResult] = useState(null);
	const [files, setFiles] = useState(null);

	const getResults = () => {
		const formData = new FormData();
		formData.append("images", files[files.length - 1]);
		Axios.post(
			`https://eureka-api-radioactive11.herokuapp.com/pneumonia`,
			formData
		)
			.then((res) => {
				console.log(res.data, "ok");
				setResult(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="Pneumonia">
			<div className="container">
				<div>
					<h1>Pneumonia Prediction</h1>
					<p className="content">
						Prediction of Pneumonia and its type (Viral Or
						Bacterial) from the X-Ray Scans.
					</p>
				</div>
				<Dropzone
					onDrop={(data) => setFiles(data)}
					accept="image/*"
					minSize={1024}
					maxSize={3072000}>
					{({
						getRootProps,
						getInputProps,
						isDragActive,
						isDragAccept,
						isDragReject,
					}) => {
						const additionalClass = isDragAccept
							? "accept"
							: isDragReject
							? "reject"
							: "";

						return (
							<div
								{...getRootProps({
									className: `dropzone ${additionalClass}`,
								})}>
								<input {...getInputProps()} />
								<span>{isDragActive ? "📂" : "📁"}</span>
								<p>
									Drag'n'drop images, or click to select files
								</p>
							</div>
						);
					}}
				</Dropzone>
				{files && (
					<div className="selected-file">
						Selected File : {files[files.length - 1].name}
					</div>
				)}
				<button className="primary" onClick={() => getResults()}>
					Get results
				</button>
				<div className="result">
					<h3>{result && result.disease_type}</h3>
				</div>
			</div>
		</div>
	);
};

export default Pneumonia;
