// CAC-TAT.spec.js created with Cypress

// Exercicio curso



describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function() {
        cy.visit('./src/index.html')

    })

    it('verificar o titulo da aplicacacao', function() {               
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatorios e envia o formulario', function() { 
        const longText = 'gostaria de receber informacao sobre o curso, gostaria de receber informacao sobre o curso, gostaria de receber informacao sobre o curso,'
        cy.get('#firstName').type  ('Safira') 
        cy.get('#lastName').type ('Camilo') 
        cy.get('#email').type  ('cypress.treinamento@gmail.com') 
        cy.get('#phone').type('34860131') 
        cy.get('#open-text-area').type(longText,{ delay: 0}) 
        cy.get('button[type="submit"]').click()     

        cy.get('.success').should('be.visible')
    
    })
    
    it('exibe mensagem de erro, porque o email está com formatação errada', function() { 
       
        cy.get('#firstName').type  ('Safira') 
        cy.get('#lastName').type ('Camilo') 
        cy.get('#email').type  ('cypress.treinamentogmail.com') 
        cy.get('#phone').type('34860131') 
        cy.get('#open-text-area').type('gostaria de receber informacao sobre o curso') 
        cy.get('button[type="submit"]').click()     
    
        cy.get('.error').should('be.visible')       
                    
      

    })
    
    it('campo telefone continua vazio quando preenchido com valor nao numerico', function() {        
        
        cy.get('#phone')
           .type('abcd') 
           .should('have.value', '')  
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio, mas nao preenchido antes do envio', function() {        
        
        cy.get('#firstName').type  ('Safira') 
        cy.get('#lastName').type ('Camilo') 
        cy.get('#email').type  ('cypress.treinamento@gmail.com') 
        cy.get('#phone-checkbox').click()  
        cy.get('#open-text-area').type('gostaria de receber informacao sobre o curso') 
        cy.get('button[type="submit"]').click() 
        
        cy.get('.error').should('be.visible')  
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone, area texto', function() { 
        
        cy.get('#firstName')
          .type  ('Safira') 
          .should('have.value', 'Safira')
          .clear()
          .should('have.value', '')
        
        cy.get('#lastName')
          .type  ('Camilo') 
          .should('have.value', 'Camilo')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type  ('cypress.treinamento@gmail.com') 
          .should('have.value', 'cypress.treinamento@gmail.com')
          .clear()
          .should('have.value', '')
        
        cy.get('#phone')
          .type  ('34860131') 
          .should('have.value', '34860131')
          .clear()
          .should('have.value', '')

        cy.get('#open-text-area')
          .type  ('gostaria de receber informacao sobre o curso') 
          .should('have.value', 'gostaria de receber informacao sobre o curso')
          .clear()
          .should('have.value', '')
        })

    it.only('nao preencher os campos entao exibira mensagem de erro', function() { 
        
        cy.get('button[type="submit"]').click() 
        
        cy.get('.error').should('be.visible')      
       
       
    })        
    
      
})