import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class EducationFormComponent extends Component {
  @service router;

  @action
  updateField(fieldName, event) {
    this.args.model[fieldName] = event.target.value;
  }

  @action
  updateYear(event) {
    const value = event.target.value;
    this.args.model.graduationYear = value ? parseInt(value, 10) : null;
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.args.model.save();
      this.router.transitionTo('admin.education.index');
      alert('✅ Education saved!');
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
    this.router.transitionTo('admin.education.index');
  }

  <template>
    <div class="education-form">
      <h1>{{if @model.isNew "Add Education" "Edit Education"}}</h1>

      <form {{on "submit" this.save}}>
        <label>
          Degree *
          <input
            type="text"
            value={{@model.degree}}
            {{on "input" (fn this.updateField "degree")}}
            placeholder="Bachelor of Science"
            required
          />
        </label>

        <label>
          Field of Study
          <input
            type="text"
            value={{@model.fieldOfStudy}}
            {{on "input" (fn this.updateField "fieldOfStudy")}}
            placeholder="Computer Science"
          />
        </label>

        <label>
          Institution
          <input
            type="text"
            value={{@model.institution}}
            {{on "input" (fn this.updateField "institution")}}
            placeholder="University of Example"
          />
        </label>

        <label>
          Graduation Year
          <input
            type="number"
            value={{@model.graduationYear}}
            {{on "input" this.updateYear}}
            placeholder="2020"
            min="1900"
            max="2100"
          />
        </label>

        <div class="form-actions">
          <button type="submit">Save Education</button>
          <button type="button" {{on "click" this.cancel}}>Cancel</button>
        </div>
      </form>
    </div>
  </template>
}

