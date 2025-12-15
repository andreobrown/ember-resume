import Base from 'ember-simple-auth/authenticators/base';

export default class PasswordAuthenticator extends Base {
  /**
   * Restores the session from stored data (called on page load)
   */
  async restore(data) {
    if (data.token) {
      return data;
    }
    throw new Error('No valid session data');
  }

  /**
   * Authenticates with username and password
   */
  async authenticate(username, password) {
    const response = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Authentication failed');
    }

    const data = await response.json();
    return data; // { token, user }
  }

  /**
   * Invalidates the session (logout)
   */
  async invalidate() {
    // Nothing to do on server side for simple token auth
    return true;
  }
}
