import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session;

  beforeModel() {
    // If already logged in, redirect to home
    this.session.prohibitAuthentication('index');
  }
}
