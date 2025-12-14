import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesResponsibilitiesEditRoute extends Route {
  @service store;

  async model(params) {
    // Load the responsibility with its parent relationship
    return await this.store.findRecord('responsibility', params.responsibility_id, {
      include: 'work-experience'
    });
  }
}
