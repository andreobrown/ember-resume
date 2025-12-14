import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminCertificationsNewRoute extends Route {
  @service store;

  model() {
    return this.store.createRecord('certification');
  }
}