import { beforeEach, cy, describe, it } from 'local-cypress';

describe('All Page', () => {
  beforeEach(() => {
    cy.window().then((win) =>
      win.localStorage.setItem('umami.disabled', 'true')
    );
  });

  it('should display index page', () => {
    cy.visit('/');
    cy.get('h1').contains('You can call me Clarence');
  });

  it('should display about page', () => {
    cy.visit('/about');
    cy.get('h1').contains('Theodorus Clarence');
  });

  it('should display blog page', () => {
    cy.visit('/blog');
    cy.get('h1').contains('Blog');
  });

  it('should display library page', () => {
    cy.visit('/library');
    cy.get('h1').contains('Library');
  });

  it('should display projects page', () => {
    cy.visit('/projects');
    cy.get('h1').contains('Projects');
  });

  it('should display subscribe page', () => {
    cy.visit('/subscribe');
    cy.get('h1').contains('Subscribe to theodorusclarence.com');
  });

  it('should display trf page', () => {
    cy.visit('/trf');
    cy.get('h1').contains('Rekening BCA');
  });
});
