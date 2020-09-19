import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";
import Cancer from "./pages/services/Cancer";
import Medicine from "./pages/services/Medicine";
import Pneumonia from "./pages/services/Pneumonia";

const App = () => {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Switch>
					<Route path="/" exact component={Home} />
					<PrivateRoute
						path="/dashboard"
						exact
						component={Dashboard}
					/>
					<Route path="/signup" exact component={SignUp} />
					<Route path="/login" exact component={Login} />
					<PrivateRoute
						path="/dashboard/cancer"
						exact
						component={Cancer}
					/>
					<PrivateRoute
						path="/dashboard/pneumonia"
						exact
						component={Pneumonia}
					/>
					<PrivateRoute
						path="/dashboard/medicine"
						exact
						component={Medicine}
					/>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
