import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesEditRoute extends Route {
  @service store;

  async model(params) {
    return await this.store.findRecord('work-experience', params.work_experience_id);
  }
}
