import React, { useState } from "react";
import Axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom, tokenAtom } from "../global/globalState";

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [, setUser] = useRecoilState(userAtom);
	const [, setToken] = useRecoilState(tokenAtom);
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState(null);
	const [selected, setSelected] = useState("user");

	var env = process.env.REACT_APP_API_URL;
	console.log(env);


	const handleLoginUser = () => {
		Axios.post(`${env}/patient/signin`, {
			email,
			password,
		})
			.then((res) => {
				if (res.data.error) {
					setErrors([{ msg: res.data.error }]);
				} else {
					localStorage.setItem(
						"user",
						JSON.stringify(res.data.patient)
					);
					localStorage.setItem("token", res.data.token);
					setUser(res.data.patient);
					setToken(res.data.token);
					history.push("/dashboard");
				}
			})
			.catch((err) => {
				if (Array.isArray(err.response.data.errors)) {
					setErrors(err.response.data.errors);
				} else {
					setErrors([{ msg: err.response.data.error }]);
				}
			});
	};

	const handleLoginDoc = () => {
		Axios.post(`${env}/doctor/signin`, {
			email,
			password,
		})
			.then((res) => {
				if (res.data.error) {
					setErrors([{ msg: res.data.error }]);
				} else {
					console.log(res.data);
					localStorage.setItem(
						"user",
						JSON.stringify(res.data.doctor)
					);
					localStorage.setItem("token", res.data.token);
					setUser(res.data.doctor);
					setToken(res.data.token);
					history.push("/dashboardDoc");
				}
			})
			.catch((err) => {
				if (Array.isArray(err.response.data.errors)) {
					setErrors(err.response.data.errors);
				} else {
					setErrors([{ msg: err.response.data.error }]);
				}
			});
	};
	return (
		<div className="Login">
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
					src={require("../assets/svg/doc2.svg")}
					alt=""
				/>
			</div>
			<div className="main-login">
				<h1>Login</h1>
				<div className="login-form">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="pass">Password</label>
					<input
						type="password"
						id="pass"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="primary"
						onClick={() =>
							selected === "user"
								? handleLoginUser()
								: handleLoginDoc()
						}>
						Log In
					</button>
				</div>
				<div className="error-container">
					{errors &&
						errors.map(({ msg }, index) => (
							<div key={index} className="error">
								{msg}
							</div>
						))}
				</div>
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
			</div>
		</div>
	);
};

export default Login;
