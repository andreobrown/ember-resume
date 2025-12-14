import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminProjectsIndexRoute extends Route {
  @service store;

  async model() {
    return await this.store.findAll('project');
  }
}
