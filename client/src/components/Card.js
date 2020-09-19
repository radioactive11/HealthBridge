import React from "react";
import {withRouter} from 'react-router-dom'

const Card = ({title,image,imageAlt,desc,link,history}) => {
	return (
		<div className="card" onClick={() => history.push(link)} >
			<div className="image">
				<img src={image} alt={imageAlt} />
			</div>

			<div className="content">
				<h4>{title}</h4>
				<p>{desc}
				</p>
			</div>
		</div>
	);
};

export default withRouter(Card);
