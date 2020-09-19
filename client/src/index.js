import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import RecoilLogger from "recoil-logger";
import { RecoilRoot } from "recoil";

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<RecoilLogger />
			<App />
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById("root")
);
