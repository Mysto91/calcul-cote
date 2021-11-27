import React, { Component } from "react";
import Bet from "../../class/Bet";
import { calculateNoBet, calculateOneOrTwo } from "../../util/Calcul";
import BetTable from "../betTable/BetTable";
import "./Input.css";

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			betValue: 0,
			quotationOne: 0,
			quotationTwo: 1,
			oneTwoNoBet: new Bet("1 remboursé si 2"),
			twoOneNoBet: new Bet("2 remboursé si 1"),
			oneOrTwo: new Bet("1 ou 2"),
		};
	}

	handleChange = (event) => {
		const value = event.target.value;

		if (isNaN(value)) {
			return;
		}

		const elementId = event.target.id;

		let state = {};

		switch (elementId) {
			case "quotation-1":
				state = { quotationOne: parseFloat(value) };
				break;
			case "quotation-2":
				state = { quotationTwo: parseFloat(value) };
				break;
			case "bet":
				state = { betValue: parseFloat(value) };
				break;
			default:
				break;
		}

		this.setState(state);
	};

	componentDidUpdate(prevProps, prevState) {
		const state = this.state;

		if (
			state.quotationOne !== prevState.quotationOne ||
			state.quotationTwo !== prevState.quotationTwo ||
			state.betValue !== prevState.betValue
		) {
			this.setState({
				betValue: !isNaN(state.betValue) ? state.betValue : 1,
				quotationOne: !isNaN(state.quotationOne) ? state.quotationOne : 0,
				quotationTwo: !isNaN(state.quotationTwo) ? state.quotationTwo : 0,
			});

			this.updateResult();
		}
	}

	updateResult = () => {
		const state = this.state;

		if (
			isNaN(state.quotationOne) ||
			isNaN(state.quotationTwo) ||
			isNaN(state.betValue)
		) {
			// A gérer
			return this.setState(new Bet("toto"));
		}

		const mise = state.betValue;
		const quotationOne = state.quotationOne;
		const quotationTwo = state.quotationTwo;

		this.setState({
			oneTwoNoBet: this.updateBet(
				state.oneTwoNoBet.title,
				calculateNoBet(mise, quotationOne, quotationTwo)
			),
			twoOneNoBet: this.updateBet(
				state.twoOneNoBet.title,
				calculateNoBet(mise, quotationTwo, quotationOne, true)
			),
			oneOrTwo: this.updateBet(
				state.oneOrTwo.title,
				calculateOneOrTwo(mise, quotationOne, quotationTwo)
			),
		});
	};

	/**
	 *
	 * @param {String} title
	 * @param {Object} detail
	 */
	updateBet = (title, detail) => ({ ...{ title: title }, ...detail });

	render() {
		const state = this.state;

		const inputList = [
			{
				id: "bet",
				title: "Mise",
			},
			{
				id: "quotation-1",
				title: "Cote primaire (1)",
			},
			{
				id: "quotation-2",
				title: "Cote secondaire (2)",
			},
		];

		return (
			<div className="vertical-center">
				<form>
					<div id="form-input" className="horizontal-center">
						{inputList.map((input) => {
							return (
								<div key={input.id}>
									<label htmlFor={input.id} className="input-label">
										{input.title}
									</label>
									<input
										id={input.id}
										type="text"
										className="input-field"
										onChange={this.handleChange}
									/>
								</div>
							);
						})}
					</div>
				</form>
				<BetTable {...state}></BetTable>
			</div>
		);
	}
}
