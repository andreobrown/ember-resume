import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import JobTitleList from './job-title-list';
import ResponsibilityList from './responsibility-list';
import AchievementList from './achievement-list';

export default class WorkExperienceFormComponent extends Component {
  @service router;

  @action
  updateField(fieldName, event) {
    this.args.model[fieldName] = event.target.value;
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.args.model.save();
      this.router.transitionTo('admin.work-experiences.index');
      alert('✅ Work experience saved!');
    } catch (error) {
      alert('❌ Error: ' + error.message);
      console.error(error);
    }
  }

  @action
  cancel() {
    if (this.args.model.isNew) {
      this.args.model.deleteRecord();
    } else {
      this.args.model.rollbackAttributes();
    }
    this.router.transitionTo('admin.work-experiences.index');
  }

  <template>
    <div class="work-experience-form">
      <h1>{{if @model.isNew "Add Work Experience" "Edit Work Experience"}}</h1>

      <form {{on "submit" this.save}}>
        <label>
          Company *
          <input
            type="text"
            value={{@model.company}}
            {{on "input" (fn this.updateField "company")}}
            placeholder="Acme Corporation"
            required
          />
        </label>

        <label>
          Location
          <input
            type="text"
            value={{@model.location}}
            {{on "input" (fn this.updateField "location")}}
            placeholder="Toronto, Ontario"
          />
        </label>

        <div class="form-actions">
          <button type="submit">Save Work Experience</button>
          <button type="button" {{on "click" this.cancel}}>Cancel</button>
        </div>
      </form>

      {{#unless @model.isNew}}
        <hr />
        <JobTitleList @model={{@model.jobTitles}} @workExperience={{@model}} />
        <hr />
        <ResponsibilityList @model={{@model.responsibilities}} @workExperience={{@model}} />
        <hr />
        <AchievementList @model={{@model.achievements}} @workExperience={{@model}} />
      {{/unless}}
    </div>
  </template>
}
