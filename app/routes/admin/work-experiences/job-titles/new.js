import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesJobTitlesNewRoute extends Route {
  @service store;

  async model() {
    // Get the work_experience_id from the parent route's params
    const params = this.paramsFor('admin.work-experiences.job-titles');

    // Load the work experience
    const workExperience = await this.store.findRecord('work-experience', params.work_experience_id);

    // Create new job title linked to this work experience
    return this.store.createRecord('job-title', {
      workExperience: workExperience
    });
  }
}
