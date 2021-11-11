import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Trf Page', () => {
  beforeEach(() => {
    cy.visit('/trf');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Rekening BCA');
  });
});
