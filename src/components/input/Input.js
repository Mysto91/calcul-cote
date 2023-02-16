import { FormControlLabel, Switch } from "@mui/material";
import React, { Component } from "react";
import Bet from "../../class/Bet";
import { calculateNoBet, calculateOneOrTwo, float, isNumber } from "../../util/Calcul";
import BetTable from "../betTable/BetTable";
import "./Input.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			betValue: null,
			quotationOne: null,
			quotationTwo: null,
			oneTwoNoBet: new Bet("1 R 2"),
			twoOneNoBet: new Bet("2 R 1"),
			oneOrTwo: new Bet("1 ou 2"),
			betBoosted: true
		};
	}

	handleChange = (event) => {
		const target = event.target;
		let value = null;

		switch (target.type) {
			case 'text':
				value = float(target.value);
				break;
			case 'checkbox':
				value = target.checked;
				break;
			default:
				break;
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
				<form>
					<div id="form-input" className="horizontal-center">
						<Box
							component="form"
							sx={{
								borderColor: 'white',
								'& .MuiTextField-root': { 
									m: 1, 
									width: '25ch'
								},
							}}
							noValidate
							autoComplete="off"
						>
							{inputList.map((input) => {
								return (
									<TextField
										key={input.id}
										id={input.id}
										label={input.title}
										sx={{
											label: {
												color: 'white',
												borderColor: 'white',
											},
											div: {
												color: 'white',
												borderColor: 'white',
											}
										}}
										size="small"
										onChange={this.handleChange}
										maxLength="8"
									/>
								);
							})}
						</Box>
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
