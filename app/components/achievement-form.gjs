import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class AchievementFormComponent extends Component {
  @service router;

  @action
  updateField(fieldName, event) {
    this.args.model[fieldName] = event.target.value;
  }

  @action
  updateSortOrder(event) {
    const value = event.target.value;
    this.args.model.sortOrder = value ? parseInt(value, 10) : 0;
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.args.model.save();
      // Navigate back to work experience edit page
      const workExpId = this.args.model.workExperience.get('id');
      this.router.transitionTo('admin.work-experiences.edit', workExpId);
      alert('✅ Achievement saved!');
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
    const workExpId = this.args.model.workExperience.get('id');
    this.router.transitionTo('admin.work-experiences.edit', workExpId);
  }

  <template>
    <div class="achievement-form">
      <h1>{{if @model.isNew "Add Achievement" "Edit Achievement"}}</h1>
      <p class="breadcrumb">
        Work Experience: <strong>{{@model.workExperience.company}}</strong>
      </p>

      <form {{on "submit" this.save}}>
        <label>
          Achievement *
          <textarea
            value={{@model.content}}
            {{on "input" (fn this.updateField "content")}}
            placeholder="Increased system performance by 40% through optimization"
            rows="3"
            required
          ></textarea>
        </label>

        <label>
          Sort Order
          <input
            type="number"
            value={{@model.sortOrder}}
            {{on "input" this.updateSortOrder}}
            placeholder="0"
            min="0"
          />
          <small>Lower numbers appear first</small>
        </label>

        <div class="form-actions">
          <button type="submit">Save Achievement</button>
          <button type="button" {{on "click" this.cancel}}>Cancel</button>
        </div>
      </form>
    </div>
  </template>
}
