import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Spotify feature works as expected', () => {
  beforeEach(() => {
    cy.window().then((win) =>
      win.localStorage.setItem('umami.disabled', 'true')
    );
  });

  it('should not show anything when nothing is playing', () => {
    cy.intercept('/api/spotify', {
      fixture: 'spotify/not-playing.json',
    }).as('spotify');
    cy.visit('/about');
    cy.wait('@spotify');

    cy.get('[data-cy=spotify]').should('not.exist');
  });

  it('should show card when something is playing', () => {
    cy.intercept('/api/spotify', {
      fixture: 'spotify/playing.json',
    }).as('spotify');
    cy.visit('/about');
    cy.wait('@spotify');

    cy.get('[data-cy=spotify]').should('exist');
  });
});
