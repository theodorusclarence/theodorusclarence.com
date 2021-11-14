import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Subscribe Page', () => {
  beforeEach(() => {
    cy.window().then((win) =>
      win.localStorage.setItem('umami.disabled', 'true')
    );
    cy.visit('/subscribe');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Subscribe to theodorusclarence.com');
  });
});
