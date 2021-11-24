import React, { Component } from 'react'

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            betValue: 0,
            quotationOne: 0,
            quotationTwo: 1,
            oneTwoNoBet: {
                bet1: 0,
                bet2: 0,
                quotation: 0,
                gain: 0,
                gainNet: 0,
            },
            twoOneNoBet: {
                bet1: 0,
                bet2: 0,
                quotation: 0,
                gain: 0,
                gainNet: 0,
            }
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

        if (!isNaN(this.state.quotationOne)
            && !isNaN(this.state.quotationTwo)
            && !isNaN(this.state.betValue)) {
            const state = this.state;

            const mise = state.betValue;
            const quotationOne = state.quotationOne;
            const quotationTwo = state.quotationTwo;

            this.setState(
                {
                    oneTwoNoBet: this.calculateNoBet(mise, quotationOne, quotationTwo),
                    twoOneNoBet: this.calculateNoBet(mise, quotationTwo, quotationOne)
                }
            );
        }
    }

    calculateNoBet = (mise, q1, q2) => {
        const bet2 = mise / q2;
        const bet1 = mise - bet2;
        const quotation = bet1 * q1 / mise;

        return {
            bet1: this.trunc(bet1),
            bet2: this.trunc(bet2),
            quotation: this.trunc(quotation),
            gain: this.trunc(mise * quotation),
            gainNet: this.trunc(mise * quotation - mise),
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

        const tableStyles = {
            border: '1px solid rgba(0, 0, 0, 0.05)',
        };

        return (
            <div className="vertical-center">
                <form>
                    <label htmlFor="bet">Mise</label>
                    <input id="bet" type="text" onChange={this.handleChange} />
                    <label htmlFor="quotation-1">Cote principale</label>
                    <input id="quotation-1" type="text" onChange={this.handleChange} />
                    <label htmlFor="quotation-2">Cote secondaire</label>
                    <input id="quotation-2" type="text" onChange={this.handleChange} />
                </form>
                <table style={tableStyles}>
                    <thead>
                        <tr>
                            <th colSpan="1">Pari</th>
                            <th colSpan="1">Cote</th>
                            <th colSpan="1">Mise principale</th>
                            <th colSpan="1">Mise secondaire</th>
                            <th colSpan="1">Gain</th>
                            <th colSpan="1">Gain net</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1 remboursé si 2</td>
                            <td>{state.oneTwoNoBet.quotation}</td>
                            <td>{state.oneTwoNoBet.bet1} €</td>
                            <td>{state.oneTwoNoBet.bet2} €</td>
                            <td>{state.oneTwoNoBet.gain} €</td>
                            <td>{state.oneTwoNoBet.gainNet} €</td>
                        </tr>
                        <tr>
                            <td>2 remboursé si 1</td>
                            <td>{state.twoOneNoBet.quotation}</td>
                            <td>{state.twoOneNoBet.bet1} €</td>
                            <td>{state.twoOneNoBet.bet2} €</td>
                            <td>{state.twoOneNoBet.gain} €</td>
                            <td>{state.twoOneNoBet.gainNet} €</td>
                        </tr>
                    </tbody>
                </table>
            </div >
        )
    }
}
