describe('user happy path', () => {
  it('should register successfully', () => {
    // visit the url
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');

    // Get to register page
    cy.get('button[name="loginButton"]').click();
    cy.url().should('include', 'localhost:3000/login');
    cy.get('div[name="linkToSignUp"]').click();
    cy.url().should('include', 'localhost:3000/register');
    // Register
    cy.get('input[name="name"]').focus().type('randomName');
    cy.get('input[name="email"]').focus().type('randomEmail@email.com');
    cy.get('input[name="password"]').focus().type('password');
    cy.get('input[name="confirmPassword"]').focus().type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(100);

    // Create a new listing
    cy.url().should('include', 'localhost:3000/mylisting');
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
    cy.get('input[type=file]').selectFile(
      '../../ass3/frontend/public/picture1.png',
      {
        force: true,
      }
    );
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'localhost:3000/mylisting');

    // Change Title and Thumbnail
    cy.get('button[name="editBtn"]').click();
    cy.get('input[name="title"]').focus().clear();
    cy.get('input[name="title"]').focus().type('Better Apartment');
    cy.get('input[id="basic_thumbnail"]').selectFile(
      '../../ass3/frontend/public/picture4.jpeg',
      {
        force: true,
      }
    );
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'localhost:3000/mylisting');

    // Publish Listing
    cy.get('button[name="publishBtn"]').click();
    cy.get('input[id="firstRange"]').click();
    cy.get('td[title="2022-12-30"]').click();
    cy.get('td[title="2022-12-31"]').click();
    cy.get('button[name="publishSubmit"]').click();
    cy.url().should('include', 'localhost:3000/mylisting');
    cy.wait(1000);

    // Unpublish Listing
    cy.get('button[name="publishBtn"]').click();
    cy.get('button[name="unpublishSubmit"]').click();
    cy.url().should('include', 'localhost:3000/mylisting');

    // logout
    cy.get('button[name="logoutButton"]').click();
    cy.get('button[name="logoutSubmit"]').click();
    cy.url().should('include', 'localhost:3000/login');

    // Register another user randomName2
    cy.get('div[name="linkToSignUp"]').click();
    cy.url().should('include', 'localhost:3000/register');
    cy.get('input[name="name"]').focus().type('randomName2');
    cy.get('input[name="email"]').focus().type('randomEmail2@email.com');
    cy.get('input[name="password"]').focus().type('password2');
    cy.get('input[name="confirmPassword"]').focus().type('password2');
    cy.get('button[type="submit"]').click();
    cy.wait(100);

    // randomName2 create a new listing
    cy.url().should('include', 'localhost:3000/mylisting');
    cy.get('button[name="createNewListing"]').click();
    cy.url().should('include', 'localhost:3000/newlisting');
    cy.get('input[name="title"]').focus().type('Another Good House');
    cy.get('input[name="addressLine"]').focus().type('2 Main Drive');
    cy.get('input[name="city"]').focus().type('Sydney');
    cy.get('input[name="state"]').focus().type('NSW');
    cy.get('input[name="country"]').focus().type('Australia');
    cy.get('input[name="price"]').focus().type('250');
    cy.get('input[id="basic_propertyType"]').click();
    cy.get('div[label="Room"]').click();
    cy.get('input[name="numBathroom"]').focus().type('1');
    cy.get('input[name="numBedroom"]').focus().type('2');
    cy.get('input[name="numBed"]').focus().type('3');
    cy.get('input[name="bedroomDetails"]')
      .focus()
      .type('There are two nice bedrooms');
    cy.get('input[id="basic_amenities"]').click();
    cy.get('div[label="Wi-Fi"]').click();
    cy.get('div[label="Kitchen"]').click();
    cy.get('input[name="bedroomDetails"]').focus();
    cy.get('input[type=file]').selectFile('../../ass3/frontend/public/picture1.png', {
      force: true,
    });
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'localhost:3000/mylisting');

    // Publish Listing
    cy.get('button[name="publishBtn"]').click();
    cy.get('input[id="firstRange"]').click();
    cy.get('td[title="2022-12-30"]').click();
    cy.get('td[title="2022-12-31"]').click();
    cy.get('button[name="publishSubmit"]').click();
    cy.url().should('include', 'localhost:3000/mylisting');
    cy.wait(1000);

    // logout
    cy.get('button[name="logoutButton"]').click();
    cy.get('button[name="logoutSubmit"]').click();
    cy.url().should('include', 'localhost:3000/login');

    // The first user login again
    cy.get('input[name="email"]').focus().type('randomEmail@email.com');
    cy.get('input[name="password"]').focus().type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(500);

    // The first user make a booking
    cy.url().should('include', 'localhost:3000/mylisting');
    cy.get('button[name="home"]').click();
    cy.get('img[alt="thumbnail-Another Good House"]').click();
    cy.url().should('include', 'localhost:3000/listing');
    cy.get('button[name="bookBtn"]').click();
    cy.get('input[placeholder="Start date"]').click();
    cy.get('td[title="2022-12-30"]').click();
    cy.get('td[title="2022-12-31"]').click();
    cy.get('button[name="bookSubmit"]').click();

    // the first user log out
    cy.get('button[name="logoutButton"]').click();
    cy.get('button[name="logoutSubmit"]').click();
    cy.url().should('include', 'localhost:3000/login');

    // the first user log in again
    cy.get('input[name="email"]').focus().type('randomEmail@email.com');
    cy.get('input[name="password"]').focus().type('password');
    cy.get('button[type="submit"]').click();
  });
});
