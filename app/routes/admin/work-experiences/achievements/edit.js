import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminWorkExperiencesAchievementsEditRoute extends Route {
  @service store;

  async model(params) {
    return await this.store.findRecord('achievement', params.achievement_id);
  }
}
