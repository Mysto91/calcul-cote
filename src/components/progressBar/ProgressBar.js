import React, { Component } from "react";
import "./ProgressBar.css";

export default class ProgressBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			percentage: 0,
		};
	}

	componentDidUpdate = (prevProps) => {
		if (prevProps.percentage !== this.props.percentage) {
			this.setState({ percentage: this.props.percentage });
		}
	};

	render() {
		const percentage = this.state.percentage * 100;
		return (
			<div className="meter">
				<span
					className="progress-bar"
					style={{ width: percentage + "%" }}
				>
					{percentage.toString().split(".")[0] + "%"}
				</span>
			</div>
		);
	}
}
