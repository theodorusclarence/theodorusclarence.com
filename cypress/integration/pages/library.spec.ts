import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Library Page', () => {
  beforeEach(() => {
    cy.visit('/library');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Library');
  });
});
