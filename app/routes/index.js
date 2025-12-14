import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    const candidates = await this.store.findAll('candidate');
    const projects = await this.store.findAll('project');
    const education = await this.store.findAll('education');
    const certifications = await this.store.findAll('certification');

    return hash({
      candidate: candidates.at(0) || null,
      projects: projects,
      education: education,
      certifications: certifications
    });
  }
}
