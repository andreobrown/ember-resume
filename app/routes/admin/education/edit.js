import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminEducationEditRoute extends Route {
  @service store;

  async model(params) {
    return await this.store.findRecord('education', params.education_id);
  }
}
