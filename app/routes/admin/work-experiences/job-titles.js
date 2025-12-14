import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesJobTitlesRoute extends Route {
  @service store;

  async model(params) {
    console.log('job-titles parent route params:', params);
    console.log('work_experience_id:', params.work_experience_id);

    // This parent route loads the work experience
    // Child routes (new, edit) can access it via modelFor()
    return await this.store.findRecord('work-experience', params.work_experience_id);
  }
}
