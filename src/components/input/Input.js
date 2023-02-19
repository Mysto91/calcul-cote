import React, { Component } from "react";
import Bet from "../../class/Bet";
import { calculateNoBet, calculateOneOrTwo, float, isNumber } from "../../util/Calcul";
import BetTable from "../betTable/BetTable";
import "./Input.css";
import Box from '@mui/material/Box';
import InputField from "./InputField";
import SwitchField from "./SwitchField";

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			betValue: null,
			quotationOne: null,
			quotationTwo: null,
			oneTwoNoBet: new Bet("1r2"),
			twoOneNoBet: new Bet("2r1"),
			oneOrTwo: new Bet("1|2"),
			betBoosted: true
		};
	}

	handleInputChange = (input) => {
		const value = float(document.getElementById(input.id).value);

		let state = {};

		switch (input.id) {
			case 'quotation-1':
				state = { quotationOne: value };
				break;
			case 'quotation-2':
				state = { quotationTwo: value };
				break;
			case 'bet':
				state = { betValue: value };
				break;
			default:
				break;
		}

		this.setState(state);
	};

	handleSwitchChange = (id) => this.setState({ betBoosted: document.getElementById(id).checked });

	componentDidUpdate(prevProps, prevState) {
		const state = this.state;

		if (
			state.quotationOne !== prevState.quotationOne ||
			state.quotationTwo !== prevState.quotationTwo ||
			state.betValue !== prevState.betValue ||
			state.betBoosted !== prevState.betBoosted
		) {
			this.setState({
				betValue: isNumber(state.betValue) ? state.betValue : 0,
				betBoosted: state.betBoosted,
				quotationOne: isNumber(state.quotationOne) ? state.quotationOne : 0,
				quotationTwo: isNumber(state.quotationTwo) ? state.quotationTwo : 0,
			});

			this.updateResult();
		}
	}

	isValidInputs = () => {
		const state = this.state;
		//TO DO : remplacer par yup validation
		if (
			!isNumber(state.quotationOne) ||
			!isNumber(state.quotationTwo) ||
			state.quotationOne === 0 ||
			state.quotationTwo === 0 ||
			state.quotationTwo === 1
		) {
			return false;
		}

		const betValue = state.betValue;

		if (!state.betBoosted && (!isNumber(betValue) || betValue === 0)) {
			return false
		}

		return true;
	}

	updateResult = () => {
		const state = this.state;

		if (!this.isValidInputs()) {
			return;
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
				title: `Mise ${state.betBoosted ? 'cote boostée' : 'totale'}`,
			},
			{
				id: "quotation-1",
				title: `Cote 1 ${state.betBoosted ? 'boostée' : ''}`,
			},
			{
				id: "quotation-2",
				title: "Cote 2",
			},
		];

		return (
			<div className="vertical-center">
				<Box
					id="form-input"
					component="form"
					noValidate
					autoComplete="off"
				>
					{
						inputList.map((input) => <InputField key={input.id} input={input} onChange={this.handleInputChange} />)
					}
					<SwitchField id="bet-boosted" label="Cote boostée" onChange={this.handleSwitchChange} />
				</Box>
				<BetTable {...state} />
			</div>
		);
	}
}
