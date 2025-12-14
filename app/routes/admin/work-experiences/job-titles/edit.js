import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesJobTitlesEditRoute extends Route {
  @service store;

  async model(params) {
    // Load the job title with its relationship to work experience
    return await this.store.findRecord('job-title', params.job_title_id, {
      include: 'work-experience'  // Include parent for breadcrumb
    });
  }
}
