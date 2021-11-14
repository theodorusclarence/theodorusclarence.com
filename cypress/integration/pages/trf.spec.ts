import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Trf Page', () => {
  beforeEach(() => {
    cy.window().then((win) =>
      win.localStorage.setItem('umami.disabled', 'true')
    );
    cy.visit('/trf');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Rekening BCA');
  });
});
