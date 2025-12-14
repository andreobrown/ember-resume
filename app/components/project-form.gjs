import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class ProjectFormComponent extends Component {
  @service router;
  @tracked technologiesInput = '';

  constructor() {
    super(...arguments);
    // Initialize the input field with existing technologies
    if (this.args.model.technologies) {
      this.technologiesInput = this.args.model.technologies.join(', ');
    }
  }

  @action
  updateField(fieldName, event) {
    this.args.model[fieldName] = event.target.value;
  }

  @action
  updateTechnologies(event) {
    // Just update the tracked input, don't process yet
    this.technologiesInput = event.target.value;
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      // Convert technologies string to array before saving
      const techArray = this.technologiesInput
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);
      this.args.model.technologies = techArray;

      await this.args.model.save();
      this.router.transitionTo('admin.projects.index');
      alert('✅ Project saved!');
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
    this.router.transitionTo('admin.projects.index');
  }

  <template>
    <div class="project-form">
      <h1>{{if @model.isNew "Add New Project" "Edit Project"}}</h1>

      <form {{on "submit" this.save}}>
        <label>
          Project Name *
          <input
            type="text"
            value={{@model.name}}
            {{on "input" (fn this.updateField "name")}}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={{@model.description}}
            {{on "input" (fn this.updateField "description")}}
            rows="3"
          ></textarea>
        </label>

        <label>
          Technologies (comma-separated)
          <input
            type="text"
            value={{this.technologiesInput}}
            {{on "input" this.updateTechnologies}}
            placeholder="EmberJS, Ruby on Rails, PostgreSQL"
          />
        </label>

        <label>
          Project URL
          <input
            type="url"
            value={{@model.url}}
            {{on "input" (fn this.updateField "url")}}
            placeholder="https://example.com"
          />
        </label>

        <div class="form-actions">
          <button type="submit">Save Project</button>
          <button type="button" {{on "click" this.cancel}}>Cancel</button>
        </div>
      </form>
    </div>
  </template>
}
