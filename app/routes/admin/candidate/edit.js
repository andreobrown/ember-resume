import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminCandidateEditRoute extends Route {
  @service store;

  async model() {
    const candidates = await this.store.findAll('candidate');
    const existingCandidate = candidates.at(0);  // Changed from firstObject

    if (existingCandidate) {
      return existingCandidate;
    } else {
      return this.store.createRecord('candidate', {
        skills: {
          technical: [],
          soft: [],
          fun: []
        }
      });
    }
  }
}
