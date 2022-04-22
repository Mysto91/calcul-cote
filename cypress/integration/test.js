describe('Test the home page', () => {
    it('Test with boosted bet', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted').should('be.checked');
        cy.get('#bet').type('10');
        cy.get('#quotation-1').type('2');
        cy.get('#quotation-2').type('2.50');

        cy.get('#quotation-1R2').contains("1.20");
        cy.get('#bet1-1R2').contains("10.00 €");
        cy.get('#bet2-1R2').contains("6.67 €");
        cy.get('#gain-1R2').contains("20.00 €");
        cy.get('#gain-net-1R2').contains("3.33 €");

        cy.get('#quotation-2R1').contains("1.25");
        cy.get('#bet1-2R1').contains("10.00 €");
        cy.get('#bet2-2R1').contains("10.00 €");
        cy.get('#gain-2R1').contains("25.00 €");
        cy.get('#gain-net-2R1').contains("5.00 €");

        cy.get('#quotation-1ou2').contains("1.11");
        cy.get('#bet1-1ou2').contains("10.00 €");
        cy.get('#bet2-1ou2').contains("8.00 €");
        cy.get('#gain-1ou2').contains("20.00 €");
        cy.get('#gain-net-1ou2').contains("2.00 €");
    })

    it('Test with basic bet', () => {
        cy.visit(Cypress.env('host'));

        cy.get('#bet-boosted')
            .should('be.checked')
            .click({ force: true });

        cy.get('#bet').type('10');
        cy.get('#quotation-1').type('2.30');
        cy.get('#quotation-2').type('2.25');

        cy.get('#quotation-1R2').contains("1.28");
        cy.get('#bet1-1R2').contains("5.56 €");
        cy.get('#bet2-1R2').contains("4.44 €");
        cy.get('#gain-1R2').contains("12.78 €");
        cy.get('#gain-net-1R2').contains("2.78 €");

        cy.get('#quotation-2R1').contains("1.27");
        cy.get('#bet1-2R1').contains("4.35 €");
        cy.get('#bet2-2R1').contains("5.65 €");
        cy.get('#gain-2R1').contains("12.72 €");
        cy.get('#gain-net-2R1').contains("2.72 €");

        cy.get('#quotation-1ou2').contains("1.14");
        cy.get('#bet1-1ou2').contains("4.95 €");
        cy.get('#bet2-1ou2').contains("5.05 €");
        cy.get('#gain-1ou2').contains("11.37 €");
        cy.get('#gain-net-1ou2').contains("1.37 €");
    })
})