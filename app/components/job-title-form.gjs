import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class JobTitleFormComponent extends Component {
  @service router;

  @action
  updateField(fieldName, event) {
    this.args.model[fieldName] = event.target.value;
  }

  @action
  updateDate(fieldName, event) {
    const value = event.target.value;
    this.args.model[fieldName] = value ? new Date(value) : null;
  }

  @action
  toggleLeadership(event) {
    this.args.model.isLeadership = event.target.checked;
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.args.model.save();
      // Navigate back to work experience edit page
      const workExpId = this.args.model.workExperience.get('id');
      this.router.transitionTo('admin.work-experiences.edit', workExpId);
      alert('✅ Job title saved!');
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

  // Format date for input field (YYYY-MM-DD)
  dateValue(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  <template>
    <div class="job-title-form">
      <h1>{{if @model.isNew "Add Job Title" "Edit Job Title"}}</h1>
      <p class="breadcrumb">
        Work Experience: <strong>{{@model.workExperience.company}}</strong>
      </p>

      <form {{on "submit" this.save}}>
        <label>
          Job Title *
          <input
            type="text"
            value={{@model.title}}
            {{on "input" (fn this.updateField "title")}}
            placeholder="Senior Software Engineer"
            required
          />
        </label>

        <label>
          Start Date
          <input
            type="date"
            value={{this.dateValue @model.startDate}}
            {{on "input" (fn this.updateDate "startDate")}}
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            value={{this.dateValue @model.endDate}}
            {{on "input" (fn this.updateDate "endDate")}}
          />
          <small>Leave blank if current position</small>
        </label>

        <label class="checkbox-label">
          <input
            type="checkbox"
            checked={{@model.isLeadership}}
            {{on "change" this.toggleLeadership}}
          />
          Leadership Role
        </label>

        <div class="form-actions">
          <button type="submit">Save Job Title</button>
          <button type="button" {{on "click" this.cancel}}>Cancel</button>
        </div>
      </form>
    </div>
  </template>
}