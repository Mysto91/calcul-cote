import React, { Component } from 'react'
import Bet from '../../class/Bet';
import BetTable from '../betTable/BetTable';

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            betValue: 0,
            quotationOne: 0,
            quotationTwo: 1,
            oneTwoNoBet: new Bet(),
            twoOneNoBet: new Bet(),
            oneOrTwo: new Bet()
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
            case 'quotation-1':
                state = { quotationOne: parseFloat(value) };
                break;
            case 'quotation-2':
                state = { quotationTwo: parseFloat(value) };
                break;
            case 'bet':
                state = { betValue: parseFloat(value) };
                break;
            default:
                break;
        }

        this.setState(state);
    }

    componentDidUpdate(prevProps, prevState) {

        const state = this.state;

        if (state.quotationOne !== prevState.quotationOne || state.quotationTwo !== prevState.quotationTwo || state.betValue !== prevState.betValue) {
            this.setState(
                {
                    betValue: !isNaN(state.betValue) ? state.betValue : 1,
                    quotationOne: !isNaN(state.quotationOne) ? state.quotationOne : 0,
                    quotationTwo: !isNaN(state.quotationTwo) ? state.quotationTwo : 0,
                }
            );

            this.updateResult();
        }
    }

    updateResult = () => {
        const state = this.state;

        if (isNaN(state.quotationOne) || isNaN(state.quotationTwo) || isNaN(state.betValue)) {
            return this.setState(new Bet());
        }

        const mise = state.betValue;
        const quotationOne = state.quotationOne;
        const quotationTwo = state.quotationTwo;

        this.setState(
            {
                oneTwoNoBet: this.calculateNoBet(mise, quotationOne, quotationTwo),
                twoOneNoBet: this.calculateNoBet(mise, quotationTwo, quotationOne),
                oneOrTwo: this.calculateOneOrTwo(mise, quotationOne, quotationTwo),
            }
        );
    }

    calculateNoBet = (mise, q1, q2) => {
        const bet2 = mise / q2;
        const bet1 = mise - bet2;
        const quotation = bet1 * q1 / mise;
        const probability = 1 / quotation;

        return {
            bet1: this.trunc(bet1),
            bet2: this.trunc(bet2),
            quotation: this.trunc(quotation),
            gain: this.trunc(mise * quotation),
            gainNet: this.trunc(mise * quotation - mise),
            probability: this.trunc(probability < 1 ? probability : 1),
        };
    }

    calculateOneOrTwo = (mise, q1, q2) => {
        const bet2 = q2 * mise / (q1 + q2);
        const bet1 = mise - bet2;
        const quotation = q1 * q2 / (q1 + q2);
        const probability = 1 / quotation;

        return {
            bet1: this.trunc(bet1),
            bet2: this.trunc(bet2),
            quotation: this.trunc(quotation),
            gain: this.trunc(mise * quotation),
            gainNet: this.trunc(mise * quotation - mise),
            probability: this.trunc(probability < 1 ? probability : 1),
        };
    }

    /**
     * 
     * @param {Number} value 
     * @param {integer} digit 
     * 
     * @return {Number}
     */
    trunc = (value, digit = 2) => !isNaN(value) ? value.toFixed(digit) : value;

    render() {
        const state = this.state;

        return (
            <div className="vertical-center">
                <form>
                    <div id="form-input" className="horizontal-center">
                        <div>
                            <label htmlFor="bet" className="input-label">Mise </label>
                            <input id="bet" type="text" className="input-field" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="quotation-1" className="input-label">Cote principale (1) </label>
                            <input id="quotation-1" type="text" className="input-field" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="quotation-2" className="input-label">Cote secondaire (2) </label>
                            <input id="quotation-2" type="text" className="input-field" onChange={this.handleChange} />
                        </div>
                    </div>
                </form>
                <BetTable {...state}></BetTable>
            </div >
        )
    }
}
