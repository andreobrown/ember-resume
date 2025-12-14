import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesResponsibilitiesNewRoute extends Route {
  @service store;

  async model() {
    // Get the work_experience_id from the parent route's params
    const params = this.paramsFor('admin.work-experiences.responsibilities');

    // Load the work experience
    const workExperience = await this.store.findRecord('work-experience', params.work_experience_id);

    // Create new responsibility linked to this work experience
    return this.store.createRecord('responsibility', {
      workExperience: workExperience,
      sortOrder: 0  // Default sort order
    });
  }
}
