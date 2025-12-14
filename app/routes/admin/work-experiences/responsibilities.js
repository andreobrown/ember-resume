import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesResponsibilitiesRoute extends Route {
  @service store;

  async model(params) {
    // Load the work experience for nested routes
    return await this.store.findRecord('work-experience', params.work_experience_id);
  }
}
