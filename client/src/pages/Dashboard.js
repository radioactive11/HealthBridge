import React from "react";
import Card from "../components/Card";
import { useRecoilValue } from "recoil";
import { userAtom } from "../global/globalState";

const services = [
	{
		title: "Cancer Prediction",
		image: require("../assets/icons/heart.png"),
		imageAlt: "Heart Icon",
		desc:
			"Breast Cancer detection which will be able to predict whether the cells are cancerous or not",
		link: "/dashboard/cancer",
	},
];

const Dashboard = () => {
	const user = useRecoilValue(userAtom);
	return (
		<div className="Dashboard">
			<div className="container">
				<h1>Hi {user.name}</h1>
				<div className="cards">
					{services.map(({ imageAlt, title, image, desc, link }) => (
						<Card
							key={title}
							title={title}
							image={image}
							imageAlt={imageAlt}
							desc={desc}
							link={link}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
