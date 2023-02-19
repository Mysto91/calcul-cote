import React, { Component } from "react";
import { calculateNoBet, calculateOneOrTwo, float } from "../../util/Calcul";
import "./Input.css";
import Bet from "../../class/Bet";
import BetTable from "../betTable/BetTable";
import Box from '@mui/material/Box';
import InputField from "./InputField";
import SwitchField from "./SwitchField";
import inputSchema from "../../validators/schemas/InputSchema";

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
			betBoosted: true,
			isValid: true,
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
				betValue: isNaN(state.betValue) ? state.betValue : 0,
				betBoosted: state.betBoosted,
				quotationOne: state.quotationOne,
				quotationTwo: state.quotationTwo,
			});

			this.updateResult();
		}
	}

	updateResult = () => {
		const state = this.state;

		const {
			quotationOne,
			quotationTwo,
			betBoosted,
			betValue: mise,
		} = state;

		const schema = inputSchema(betBoosted);

		schema.validate(state)
			.then(() => {
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
			})
			.catch(error => {
				//TO DO : gérer les erreurs
			})
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
