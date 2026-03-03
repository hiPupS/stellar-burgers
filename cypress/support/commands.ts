export {};

declare global {
  namespace Cypress {
    interface Chainable {
      setAuthTokens(): Chainable<void>;
      clearAuthTokens(): Chainable<void>;
    }
  }
}

const ACCESS_TOKEN = 'fake-access-token';
const REFRESH_TOKEN = 'fake-refresh-token';

Cypress.Commands.add('setAuthTokens', () => {
  window.localStorage.setItem('refreshToken', REFRESH_TOKEN);
  document.cookie = `accessToken=${ACCESS_TOKEN}; path=/`;
});

Cypress.Commands.add('clearAuthTokens', () => {
  window.localStorage.removeItem('refreshToken');
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
});
