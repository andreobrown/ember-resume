import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminRoute extends Route {
  @service session;

  beforeModel(transition) {
    // Redirect to login if not authenticated
    this.session.requireAuthentication(transition, 'login');
  }
}
