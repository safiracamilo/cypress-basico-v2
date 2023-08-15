Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('#firstName').type  ('Safira') 
    cy.get('#lastName').type ('Camilo') 
    cy.get('#email').type  ('cypress.treinamento@gmail.com') 
    cy.get('#phone').type('34860131') 
    cy.get('#open-text-area').type('teste') 
    cy.get('button[type="submit"]').click()  


})