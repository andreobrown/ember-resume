import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { pageTitle } from 'ember-page-title';

class AuthControls extends Component {
  @service session;
  @service router;

  @action
  async logout() {
    await this.session.invalidate();
    this.router.transitionTo('index');
  }

  <template>
    <div class="auth-controls">
      {{#if this.session.isAuthenticated}}
        <span class="auth-user">👤 Admin</span>
        <button type="button" class="logout-btn" {{on "click" this.logout}}>
          Logout
        </button>
      {{else}}
        <a href="/login" class="login-link">Admin Login</a>
      {{/if}}
    </div>
  </template>
}

<template>
  {{pageTitle "Ember Resume"}}
  <AuthControls />
  {{outlet}}
</template>
