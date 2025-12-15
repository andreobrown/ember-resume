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
    const workExperiences = await this.store.findAll('work-experience');

    // Load all related records for work experiences
    // (they'll be sideloaded via compound documents when we fetch each one)
    for (const workExp of workExperiences.slice()) {
      await this.store.findRecord('work-experience', workExp.id);
    }

    return hash({
      candidate: candidates.at(0) || null,
      projects: projects,
      education: education,
      certifications: certifications,
      workExperiences: workExperiences
    });
  }
}
