import React, { useState } from "react";
import Axios from "axios";
import Dropzone from "react-dropzone";

const Cancer = () => {
	const [result, setResult] = useState(null);
	const [files, setFiles] = useState(null);

	const getResults = () => {
		const formData = new FormData();
		formData.append("images", files[files.length - 1]);
		Axios.post(
			`https://eureka-api-radioactive11.herokuapp.com/cancer`,
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
		<div className="Cancer">
			<div className="container">
				<div>
					<h1>Cancer Prediction</h1>
					<p className="content">
						Breast Cancer detection which will be able to predict
						whether the cells are cancerous or not.
					</p>
				</div>
				<Dropzone
					onDrop={(files) => {
						setFiles(files);
						console.log(files);
					}}
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
					<h3>{result && result.cancer}</h3>
				</div>
			</div>
		</div>
	);
};

export default Cancer;
