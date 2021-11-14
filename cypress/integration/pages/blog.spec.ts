import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Blog Page', () => {
  beforeEach(() => {
    cy.window().then((win) =>
      win.localStorage.setItem('umami.disabled', 'true')
    );
    cy.visit('/blog');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Blog');
  });
});
