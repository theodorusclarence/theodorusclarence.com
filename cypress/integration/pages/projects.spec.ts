import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Projects Page', () => {
  beforeEach(() => {
    cy.visit('/projects');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Projects');
  });
});
