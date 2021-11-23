import React, { Component } from 'react'

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quotation_1: 0,
            quotation_2: 1,
            nobet_bet1: 0,
            nobet_bet2: 0,
            quotationNoBet: 0,
        };
    }

    handleChange = (event) => {
        const value = event.target.value;

        if (isNaN(value)) {
            console.log("erreur de typage");
            return;
        }

        const elementId = event.target.id;

        if (elementId === 'quotation-1') {
            this.setState({ quotation_1: parseFloat(value) });
        } else {
            this.setState({ quotation_2: parseFloat(value) });
        }

        this.updateResult();
    }

    updateResult = () => {
        const state = this.state;

        const mise = 10;

        const bet2 = mise / state.quotation_2;
        const bet1 = mise - bet2;

        this.setState(
            {
                nobet_bet1: bet1,
                nobet_bet2: bet2,
                quotationNoBet: bet1 * state.quotation_1 / mise,
            }
        );
    }

    render() {
        /*const state = this.state;

        const mise = 10;

        const bet2 = mise / state.quotation_2;
        const bet1 = mise - bet2;

        const quotationNoBet = bet1 * state.quotation_1 / mise;*/

        const state = this.state;

        return (
            <div>
                <label htmlFor="quotation-1">Cote principale</label>
                <input id="quotation-1" type="text" onChange={this.handleChange} />
                <label htmlFor="quotation-2">Cote secondaire</label>
                <input id="quotation-2" type="text" onChange={this.handleChange} />
                <div id="no-bet">Cote remboursée : {state.quotationNoBet.toFixed(2)}</div>
                <div id="no-bet">Mise principale {state.nobet_bet1.toFixed(2)}</div>
                <div id="no-bet">Mise secondaire {state.nobet_bet2.toFixed(2)}</div>
            </div>
        )
    }
}
