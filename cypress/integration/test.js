describe('Test the boosted bet', () => {
    it('Test nominal', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted').should('be.checked');
        cy.get('#form-input').contains('Mise cote boostée');
        cy.get('#form-input').contains('Cote 1 boostée');
        cy.get('#form-input').contains('Cote 2');

        cy.get('#bet').type('20');
        cy.get('#quotation-1').type('2');
        cy.get('#quotation-2').type('2.50');

        cy.get('#quotation-1r2').contains("1.20");
        cy.get('#bet1-1r2').contains("20 €");
        cy.get('#bet2-1r2').contains("13.33 €");
        cy.get('#gain-1r2').contains("40 €");
        cy.get('#gain-net-1r2').contains("6.67 €");

        cy.get('#quotation-2r1').contains("1.25");
        cy.get('#bet1-2r1').contains("20 €");
        cy.get('#bet2-2r1').contains("20 €");
        cy.get('#gain-2r1').contains("50 €");
        cy.get('#gain-net-2r1').contains("10 €");

        cy.get("#quotation-1ou2").contains("1.11");
        cy.get("#bet1-1ou2").contains("20 €");
        cy.get("#bet2-1ou2").contains("16 €");
        cy.get("#gain-1ou2").contains("40 €");
        cy.get("#gain-net-1ou2").contains("4 €");
    })

    it('Test without specified bet', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted').should('be.checked');
        cy.get('#quotation-1').type('2');
        cy.get('#quotation-2').type('2.50');

        cy.get('#quotation-1r2').contains("1.20");
        cy.get('#bet1-1r2').contains("10 €");
        cy.get('#bet2-1r2').contains("6.67 €");
        cy.get('#gain-1r2').contains("20 €");
        cy.get('#gain-net-1r2').contains("3.33 €");

        cy.get('#quotation-2r1').contains("1.25");
        cy.get('#bet1-2r1').contains("10 €");
        cy.get('#bet2-2r1').contains("10 €");
        cy.get('#gain-2r1').contains("25 €");
        cy.get('#gain-net-2r1').contains("5 €");

        cy.get('#quotation-1ou2').contains("1.11");
        cy.get('#bet1-1ou2').contains("10 €");
        cy.get('#bet2-1ou2').contains("8 €");
        cy.get('#gain-1ou2').contains("20 €");
        cy.get('#gain-net-1ou2').contains("2 €");
    })

    it('Test with bet1 < bet2', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted').should('be.checked');
        cy.get('#bet').type('10');
        cy.get('#quotation-1').type('2.25');
        cy.get('#quotation-2').type('2.50');

        cy.get('#quotation-1r2').contains("1.35");
        cy.get('#bet1-1r2').contains("10 €");
        cy.get('#bet2-1r2').contains("6.67 €");
        cy.get('#gain-1r2').contains("22.50 €");
        cy.get('#gain-net-1r2').contains("5.83 €");

        cy.get('#quotation-2r1').contains("1.39");
        cy.get('#bet1-2r1').contains("10 €");
        cy.get('#bet2-2r1').contains("12.50 €");
        cy.get('#gain-2r1').contains("31.25 €");
        cy.get('#gain-net-2r1').contains("8.75 €");

        cy.get('#quotation-1ou2').contains("1.18");
        cy.get('#bet1-1ou2').contains("10 €");
        cy.get('#bet2-1ou2').contains("9 €");
        cy.get('#gain-1ou2').contains("22.50 €");
        cy.get('#gain-net-1ou2').contains("3.50 €");
    })

    it('Test with bet1 > bet2', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted').should('be.checked');
        cy.get('#bet').type('10');
        cy.get('#quotation-1').type('2.35');
        cy.get('#quotation-2').type('2.15');

        cy.get('#quotation-1r2').contains("1.26");
        cy.get('#bet1-1r2').contains("10 €");
        cy.get('#bet2-1r2').contains("8.70 €");
        cy.get('#gain-1r2').contains("23.50 €");
        cy.get('#gain-net-1r2').contains("4.80 €");

        cy.get('#quotation-2r1').contains("1.24");
        cy.get('#bet1-2r1').contains("10 €");
        cy.get('#bet2-2r1').contains("13.50 €");
        cy.get('#gain-2r1').contains("29.03 €");
        cy.get('#gain-net-2r1').contains("5.53 €");

        cy.get('#quotation-1ou2').contains("1.12");
        cy.get('#bet1-1ou2').contains("10 €");
        cy.get('#bet2-1ou2').contains("10.93 €");
        cy.get('#gain-1ou2').contains("23.50 €");
        cy.get('#gain-net-1ou2').contains("2.57 €");
    })
})

describe('Test the basic bet', () => {
    it('Test nominal', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted')
            .should('be.checked')
            .click({ force: true });

        cy.get('#form-input').contains('Mise totale');
        cy.get('#form-input').contains('Cote 1');
        cy.get('#form-input').contains('Cote 2');

        cy.get('#bet').type('10');
        cy.get('#quotation-1').type('2.30');
        cy.get('#quotation-2').type('2.25');

        cy.get('#quotation-1r2').contains("1.28");
        cy.get('#bet1-1r2').contains("5.56 €");
        cy.get('#bet2-1r2').contains("4.44 €");
        cy.get('#gain-1r2').contains("12.78 €");
        cy.get('#gain-net-1r2').contains("2.78 €");

        cy.get('#quotation-2r1').contains("1.27");
        cy.get('#bet1-2r1').contains("4.35 €");
        cy.get('#bet2-2r1').contains("5.65 €");
        cy.get('#gain-2r1').contains("12.72 €");
        cy.get('#gain-net-2r1').contains("2.72 €");

        cy.get('#quotation-1ou2').contains("1.14");
        cy.get('#bet1-1ou2').contains("4.95 €");
        cy.get('#bet2-1ou2').contains("5.05 €");
        cy.get('#gain-1ou2').contains("11.37 €");
        cy.get('#gain-net-1ou2').contains("1.37 €");
    })

    it('Test with bet1 = bet2', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted')
            .should('be.checked')
            .click({ force: true });

        cy.get('#bet').type('10');
        cy.get('#quotation-1').type('2.10');
        cy.get('#quotation-2').type('2.10');

        cy.get('#quotation-1r2').contains("1.10");
        cy.get('#bet1-1r2').contains("5.24 €");
        cy.get('#bet2-1r2').contains("4.76 €");
        cy.get('#gain-1r2').contains("11 €");
        cy.get('#gain-net-1r2').contains("1 €");

        cy.get('#quotation-2r1').contains("1.10");
        cy.get('#bet1-2r1').contains("4.76 €");
        cy.get('#bet2-2r1').contains("5.24 €");
        cy.get('#gain-2r1').contains("11 €");
        cy.get('#gain-net-2r1').contains("1 €");

        cy.get('#quotation-1ou2').contains("1.05");
        cy.get('#bet1-1ou2').contains("5 €");
        cy.get('#bet2-1ou2').contains("5 €");
        cy.get('#gain-1ou2').contains("10.50 €");
        cy.get('#gain-net-1ou2').contains("0.50 €");
    })
})