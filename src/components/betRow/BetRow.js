import React, { Component } from "react";
import ProgressBar from "../progressBar/ProgressBar";

export default class BetRow extends Component {
	render() {
		const { title, quotation, bet1, bet2, probability, gain, gainNet } =
			this.props;

		const positiveGainNet = gainNet >= 0;

		return (
			<tr>
				<td>{title}</td>
				<td>{quotation}</td>
				<td>{bet1} €</td>
				<td>{bet2} €</td>
				<td>
					<ProgressBar percentage={probability}></ProgressBar>
				</td>
				<td>{gain} €</td>
				<td className={positiveGainNet ? "positive" : "negative"}>
					{positiveGainNet ? "+" : ""}
					{gainNet} €
				</td>
			</tr>
		);
	}
}
