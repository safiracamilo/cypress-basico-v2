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
        cy.get('#phone-checkbox').check()  
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
    it('nao preencher os campos entao exibira mensagem de erro', function() { 
        
        cy.get('button[type="submit"]').click() 
        
        cy.get('.error').should('be.visible')          
       
    })    
    it('envia o formularioo com sucesso usando um comando customotizado', function() {
      
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')    
    
    })
    it('selecionar um produto (youtube) por texto', function() {
      
      cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube')      
    
    })
    it('selecionar um produto (Mentoria) por valor (value)', function() {
      
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')      
    
    })
    it('selecionar um produto (Blog) por indice', function() {
      
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog') 
        
    })
    it('selecionar o tipo de atendimento feedback', function() {

      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should( 'have.value','feedback')      
   
    }) 
    it('marcar cada tipo de atendimento', function() {

      cy.get('input[type="radio"]')
        .should( 'have.length', 3)
        .each( function( $radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })    
         
    }) 
    it('marcando e desmarcando checkboxes, depois desmarca o ultimo', function() {

      cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')

      })      
      it('seleciona um arquivo da pasta fixtures', function() {   

        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')          
          
          })
      })
      it('seleciona um arquivo simulando um drag-and-drop', function() {   

        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')          
          
          })
      })      
      it('seleciona um arquivo utilizando um fixture para a qual foi dado um alias', function() {  
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json') 
          })         
          
      })      
      it('verifica que a política de privacidade abre em outra aba sem necessidade de um clique', function() { 
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
      })
      it('acessa a página da política de privacidade removendo o target e então clicano no link', function() { 
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')
      })
      it('testa a página da política de privavidade de forma independente', function() { 
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')
      }) 
    })
        
    


    
    
    
          
