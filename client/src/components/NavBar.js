import React from "react";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom, tokenAtom } from "../global/globalState";

const NavBar = ({ history }) => {
	const [user, setUser] = useRecoilState(userAtom);
	const [, setToken] = useRecoilState(tokenAtom);
	const url = String(history.location.pathname);

	const logOut = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	return (
		<div className="NavBar">
			<div className="logo">
				<div onClick={() => history.push("/")}>
					<h1>eUreka</h1>
				</div>
			</div>
			<div className="links">
				{user ? (
					<React.Fragment>
						<div
							className={
								url === "/dashboard" || url === "/dashboardDoc"
									? "link selected"
									: "link"
							}
							onClick={() => {
								user.type === "doctor"
									? history.push("/dashboardDoc")
									: history.push("/dashboard");
							}}>
							Dashboard
						</div>
						<div
							className={
								url === "/profile" ? "link selected" : "link"
							}
							onClick={() => {
								history.push("/profile");
							}}>
							Profile
						</div>
						<div className="link" onClick={() => logOut()}>
							Logout
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div
							className={
								url === "/signup" ? "link selected" : "link"
							}
							onClick={() => history.push("/signup")}>
							Register
						</div>
						<div
							className={
								url === "/login" ? "link selected" : "link"
							}
							onClick={() => history.push("/login")}>
							Login
						</div>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default withRouter(NavBar);
