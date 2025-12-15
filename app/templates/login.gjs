import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';

class LoginForm extends Component {
  @service session;
  @service router;

  @tracked username = '';
  @tracked password = '';
  @tracked errorMessage = '';
  @tracked isLoading = false;

  @action
  updateUsername(event) {
    this.username = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  async login(event) {
    event.preventDefault();
    this.errorMessage = '';
    this.isLoading = true;

    try {
      await this.session.authenticate('authenticator:password', this.username, this.password);
      // Success - ember-simple-auth will handle redirect
    } catch (error) {
      this.errorMessage = error.message || 'Login failed';
    } finally {
      this.isLoading = false;
    }
  }

  <template>
    <div class="login-page">
      <div class="login-container">
        <h1>Admin Login</h1>

        {{#if this.errorMessage}}
          <div class="error-message">
            {{this.errorMessage}}
          </div>
        {{/if}}

        <form {{on "submit" this.login}}>
          <label>
            Username
            <input
              type="text"
              value={{this.username}}
              {{on "input" this.updateUsername}}
              placeholder="Enter username"
              required
              disabled={{this.isLoading}}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={{this.password}}
              {{on "input" this.updatePassword}}
              placeholder="Enter password"
              required
              disabled={{this.isLoading}}
            />
          </label>

          <button type="submit" disabled={{this.isLoading}}>
            {{if this.isLoading "Logging in..." "Login"}}
          </button>
        </form>

        <p class="back-link">
          <a href="/">← Back to Resume</a>
        </p>
      </div>
    </div>
  </template>
}

<template>
  <LoginForm />
</template>
