import { FormControlLabel, Switch } from "@mui/material";
import React, { Component } from "react";
import Bet from "../../class/Bet";
import { calculateNoBet, calculateOneOrTwo, float } from "../../util/Calcul";
import BetTable from "../betTable/BetTable";
import "./Input.css";

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			betValue: 0,
			quotationOne: 1,
			quotationTwo: 1,
			oneTwoNoBet: new Bet("1 R 2"),
			twoOneNoBet: new Bet("2 R 1"),
			oneOrTwo: new Bet("1 ou 2"),
			betBoosted: true
		};
	}

	handleChange = (event) => {
		const target = event.target;
		let value = null;

		if (target.type === 'text') {
			value = float(target.value);

			if (isNaN(value)) {
				return;
			}
		} else if (target.type === 'checkbox') {
			value = target.checked;
		}

		if (value === null) {
			return
		}

		const elementId = event.target.id;

		let state = {};

		switch (elementId) {
			case "quotation-1":
				state = { quotationOne: value };
				break;
			case "quotation-2":
				state = { quotationTwo: value };
				break;
			case "bet":
				state = { betValue: value };
				break;
			case "bet-boosted":
				state = { betBoosted: value };
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
			state.betValue !== prevState.betValue ||
			state.betBoosted !== prevState.betBoosted
		) {
			this.setState({
				betValue: !isNaN(state.betValue) ? state.betValue : 1,
				betBoosted: state.betBoosted,
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
		const betBoosted = state.betBoosted;

		this.setState({
			oneTwoNoBet: this.updateBet(
				state.oneTwoNoBet.title,
				calculateNoBet(mise, quotationOne, quotationTwo, betBoosted)
			),
			twoOneNoBet: this.updateBet(
				state.twoOneNoBet.title,
				calculateNoBet(mise, quotationTwo, quotationOne, betBoosted, true)
			),
			oneOrTwo: this.updateBet(
				state.oneOrTwo.title,
				calculateOneOrTwo(mise, quotationOne, quotationTwo, betBoosted)
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
				title: "Cote 1",
			},
			{
				id: "quotation-2",
				title: "Cote 2",
			},
		];

		return (
			<div className="vertical-center">
				<form>
					<div id="form-input" className="horizontal-center">
						{inputList.map((input) => {
							return (
								<div key={input.id}>
									<div className="container-label">
										<label htmlFor={input.id} className="input-label">
											{input.title}
										</label>
									</div>
									<input
										id={input.id}
										type="text"
										className="input-field"
										onChange={this.handleChange}
									/>
								</div>
							);
						})}
						<FormControlLabel
							control={
								<Switch
									id="bet-boosted"
									sx={{
										'& .MuiSwitch-switchBase.Mui-checked': {
											color: 'white',
											'&hover': {
												backgroundColor: 'white'
											}
										},
										'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
											backgroundColor: 'white',
										},
									}}
									onChange={this.handleChange}
									defaultChecked
								/>
							}
							label="Cote boostée"
						/>
					</div>
				</form>
				<BetTable {...state}></BetTable>
			</div>
		);
	}
}
