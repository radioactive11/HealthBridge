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
	{
		title: "Pneumonia Prediction",
		image: require("../assets/icons/face.png"),
		imageAlt: "Face Icon",
		desc:
			"Prediction of Pneumonia and its type (Viral Or Bacterial) from the X-Ray Scans",
		link: "/dashboard/pneumonia",
	},
	{
		title: "General Name of Medicines",
		image: require("../assets/icons/medicine.png"),
		imageAlt: "Medicine Icon",
		desc:
			"Making brand names of medicines available to the patient by providing a generic name of the medicine, which are far cheaper and easily available.",
		link: "/dashboard/medicine",
	},
	{
		title: "Book An Appointment",
		image: require("../assets/icons/doctor.png"),
		imageAlt: "Doctor Icon",
		desc:
			"Patients can book online appointments with a specific doctor and can get prescription afterwards.",
		link: "/dashboard/doctor",
	},
	{
		title: "Heart Health Prediction",
		image: require("../assets/icons/heart.png"),
		imageAlt: "Heart Icon",
		desc:
			"Patients can know the health of their heart by providing very basic details.",
		link: "/dashboard/heart",
	},
	{
		title: "Plasma Donation",
		image: require("../assets/icons/covid.png"),
		imageAlt: "Earth Icon",
		desc:
			"Patients can get to know the people for plasma.",
		link: "/dashboard/covid",
	},
];

const Dashboard = () => {
	const user = useRecoilValue(userAtom)
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
