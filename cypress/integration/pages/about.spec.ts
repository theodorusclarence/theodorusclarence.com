import { beforeEach, cy, describe, it } from 'local-cypress';

describe('About Page', () => {
  beforeEach(() => {
    cy.window().then((win) =>
      win.localStorage.setItem('umami.disabled', 'true')
    );
    cy.visit('/about');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Theodorus Clarence');
  });
});
