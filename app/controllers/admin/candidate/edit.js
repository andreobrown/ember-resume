import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AdminCandidateEditController extends Controller {
  @service router;

  @tracked skillsText = '';

  // Initialize skills text when model changes
  get skillsJSON() {
    return JSON.stringify(this.model.skills || {technical: [], soft: [], fun: []}, null, 2);
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.model.save();
      alert('✅ Resume saved!');
      this.router.transitionTo('index');
    } catch (error) {
      alert('❌ Error: ' + error.message);
      console.error(error);
    }
  }

  @action
  updateSkills(event) {
    try {
      this.model.skills = JSON.parse(event.target.value);
    } catch (e) {
      // Invalid JSON - ignore
    }
  }

  @action
  updateField(fieldName, event) {
    this.model[fieldName] = event.target.value;
  }
}
