import React, { Component } from "react";
import BetRow from "../betRow/BetRow";
import "./BetTable.css";

export default class BetTable extends Component {
	render() {
		const { oneTwoNoBet, twoOneNoBet, oneOrTwo } = this.props;

		const betList = [oneTwoNoBet, twoOneNoBet, oneOrTwo];

		return (
			<table className="horizontal-center">
				<thead>
					<tr>
						<th colSpan="1">Pari</th>
						<th colSpan="1">Cote</th>
						<th colSpan="1">Mise primaire</th>
						<th colSpan="1">Mise secondaire</th>
						<th colSpan="1" style={{ width: 400 }}>
							Probabilité
						</th>
						<th colSpan="1">Gain</th>
						<th colSpan="1">Gain net</th>
					</tr>
				</thead>
				<tbody>
					{betList.map((betRow) => (
						<BetRow key={betRow.title} {...betRow}></BetRow>
					))}
				</tbody>
			</table>
		);
	}
}
