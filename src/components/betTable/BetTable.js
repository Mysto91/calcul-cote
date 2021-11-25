import React, { Component } from "react";
import BetRow from "../betRow/BetRow";

export default class BetTable extends Component {
	render() {
		const { oneTwoNoBet, twoOneNoBet, oneOrTwo } = this.props;

		return (
			<table className="horizontal-center">
				<thead>
					<tr>
						<th colSpan="1">Pari</th>
						<th colSpan="1">Cote</th>
						<th colSpan="1">Mise principale</th>
						<th colSpan="1">Mise secondaire</th>
						<th colSpan="1">Probabilité</th>
						<th colSpan="1">Gain</th>
						<th colSpan="1">Gain net</th>
					</tr>
				</thead>
				<tbody>
					<BetRow betName="1 remboursé si 2" {...oneTwoNoBet}></BetRow>
					<BetRow betName="2 remboursé si 1" {...twoOneNoBet}></BetRow>
					<BetRow betName="1 ou 2" {...oneOrTwo}></BetRow>
				</tbody>
			</table>
		);
	}
}
