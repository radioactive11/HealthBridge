import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userAtom } from "../global/globalState";

const PrivateRoute = ({ component: Component, doc, ...rest }) => {
	const user = useRecoilValue(userAtom);

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					doc ? (
						user.type === "doctor" ? (
							<Component {...props} />
						) : (
							<Redirect to="/" />
						)
					) : user.type === "user" ? (
						<Component {...props} />
					) : (
						<Redirect to="/" />
					)
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
