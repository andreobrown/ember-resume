import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminEducationNewRoute extends Route {
  @service store;

  model() {
    return this.store.createRecord('education');
  }
}
