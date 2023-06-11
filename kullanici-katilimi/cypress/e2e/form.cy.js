describe('Test', function (){
    beforeEach(()=>
    {cy.visit('http://localhost:3000/');})
    it('ismi içeriyor mu',()=>{
        const istenilenIsım = "nergis";
        const isimInput = cy.get("[data-cy=name-input]");
        isimInput.type("nergis");
        isimInput.should("have.value",istenilenIsım);
    });

  it('email içeriyor mu',()=>{
    const istenilenEmail = "armaganergis@gmail.com";
    const emailInput = cy.get("[data-cy=email-input]");
    emailInput.type("armaganergis@gmail.com");
    emailInput.should("have.value",istenilenEmail);
    });

    it('password dogru mu',()=>{
        const istenilenPassword = "789456123";
        const passwordInput = cy.get("[data-cy=password-input]");
        passwordInput.type("789456123");
        passwordInput.should("have.value",istenilenPassword);
        });

    it("Onaylanmalı", () => {
            cy.get("[data-cy=terms-input]").check().should("be.checked");
          });

    }  
  )