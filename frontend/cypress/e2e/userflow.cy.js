describe('user happy path', () => {
  it('should navigate to the home screen successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
  });

  // it('should get to the register page successfully', () => {
  //   cy.get('button[name="loginButton"]').click();
  //   cy.url().should('include', 'localhost:3000/login');
  //   cy.get('div[name="linkToSignUp"]').click();
  //   cy.url().should('include', 'localhost:3000/register');
  // });

  // it('should register successfully', () => {
  //   cy.get('input[name="name"]').focus().type('randomName');
  //   cy.get('input[name="email"]').focus().type('randomEmail@email.com');
  //   cy.get('input[name="password"]').focus().type('password');
  //   cy.get('input[name="confirmPassword"]').focus().type('password');
  //   cy.get('button[type="submit"]').click();
  // });

  it('should get to the sign in page successfully', () => {
    cy.get('button[name="loginButton"]').click();
    cy.url().should('include', 'localhost:3000/login');
  });

  it('should sign in successfully', () => {
    cy.get('input[name="email"]').focus().type('randomEmail@email.com');
    cy.get('input[name="password"]').focus().type('password');
    cy.get('button[type="submit"]').click();
  });

  it('should create a new listing successfully', () => {
    cy.get('button[name="createNewListing"]').click();
    cy.url().should('include', 'localhost:3000/newlisting');
    cy.get('input[name="title"]').focus().type('A Good House');
    cy.get('input[name="addressLine"]').focus().type('1 Studio Drive');
    cy.get('input[name="city"]').focus().type('Eastgardens');
    cy.get('input[name="state"]').focus().type('NSW');
    cy.get('input[name="country"]').focus().type('Australia');
    cy.get('input[name="price"]').focus().type('150');
    cy.get('input[id="basic_propertyType"]').click();
    cy.get('div[label="Room"]').click();
    cy.get('input[name="numBathroom"]').focus().type('2');
    cy.get('input[name="numBedroom"]').focus().type('4');
    cy.get('input[name="numBed"]').focus().type('4');
    cy.get('input[name="bedroomDetails"]')
      .focus()
      .type('There is four nice bedrooms');
    cy.get('input[id="basic_amenities"]').click();
    cy.get('div[label="Wi-Fi"]').click();
    cy.get('div[label="Kitchen"]').click();
    cy.get('input[name="bedroomDetails"]').focus();
    cy.wait(5000);
    cy.get('button[type="submit"]').click();
  });
});
