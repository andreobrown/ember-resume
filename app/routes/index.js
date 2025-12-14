import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    const candidates = await this.store.findAll('candidate');
    const projects = await this.store.findAll('project');

    return hash({
      candidate: candidates.at(0) || null,
      projects: projects
    });
  }
}
