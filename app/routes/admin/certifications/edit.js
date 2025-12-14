import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminCertificationsEditRoute extends Route {
  @service store;

  async model(params) {
    return await this.store.findRecord('certification', params.certification_id);
  }
}