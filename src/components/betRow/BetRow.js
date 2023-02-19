import React, { Component } from "react";
import ProgressBar from "../progressBar/ProgressBar";

export default class BetRow extends Component {
	render() {
		const { 
			title, 
			quotation, 
			bet1, bet2, 
			probability, 
			gain, 
			gainNet 
		} = this.props;

		const positiveGainNet = gainNet >= 0;
		const titleId = title.replaceAll(' ', '');

		return (
			<tr>
				<td>{title}</td>
				<td id={`quotation-${titleId}`}>{quotation}</td>
				<td id={`bet1-${titleId}`}>{bet1} €</td>
				<td id={`bet2-${titleId}`}>{bet2} €</td>
				<td className="td-responsive">
					<ProgressBar percentage={probability}></ProgressBar>
				</td>
				<td id={`gain-${titleId}`}>{gain} €</td>
				<td id={`gain-net-${titleId}`} className={positiveGainNet ? "positive" : "negative"}>
					{positiveGainNet ? "+" : ""}
					{gainNet} €
				</td>
			</tr >
		);
	}
}
