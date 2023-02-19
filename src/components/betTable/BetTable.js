import React, { Component } from "react";
import BetRow from "../betRow/BetRow";
import "./BetTable.css";

export default class BetTable extends Component {
	render() {
		const { 
			oneTwoNoBet, 
			twoOneNoBet, 
			oneOrTwo, 
			betBoosted 
		} = this.props;

		const betList = [
			oneTwoNoBet, 
			twoOneNoBet, 
			oneOrTwo
		];

		return (
			<table className="horizontal-center">
				<thead>
					<tr>
						<th colSpan="1">Pari</th>
						<th colSpan="1">Cote</th>
						<th colSpan="1">Mise 1 {betBoosted ? 'boostée' : ''}</th>
						<th colSpan="1">Mise 2</th>
						<th colSpan="1" className="responsive-title">
							Probabilité
						</th>
						<th colSpan="1">Gain</th>
						<th colSpan="1">Gain net</th>
					</tr>
				</thead>
				<tbody>
					{
						betList.map((betRow) => <BetRow key={betRow.title} {...betRow}></BetRow>)
					}
				</tbody>
			</table>
		);
	}
}
