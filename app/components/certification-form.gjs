import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class CertificationFormComponent extends Component {
  @service router;

  @action
  updateField(fieldName, event) {
    this.args.model[fieldName] = event.target.value;
  }

  @action
  updateYear(event) {
    const value = event.target.value;
    // Convert year to Date object (Jan 1 of that year), or null if empty
    this.args.model.dateEarned = value ? new Date(parseInt(value), 0, 1) : null;
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.args.model.save();
      this.router.transitionTo('admin.certifications.index');
      alert('✅ Certification saved!');
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
    this.router.transitionTo('admin.certifications.index');
  }

  // Get year for input field
  get yearValue() {
    if (!this.args.model.dateEarned) return '';
    const date = new Date(this.args.model.dateEarned);
    return date.getFullYear().toString();
  }

  <template>
    <div class="certification-form">
      <h1>{{if @model.isNew "Add Certification/Course" "Edit Certification/Course"}}</h1>

      <form {{on "submit" this.save}}>
        <label>
          Certification Name *
          <input
            type="text"
            value={{@model.name}}
            {{on "input" (fn this.updateField "name")}}
            placeholder="AWS Certified Solutions Architect"
            required
          />
        </label>

        <label>
          Issuing Organization
          <input
            type="text"
            value={{@model.issuer}}
            {{on "input" (fn this.updateField "issuer")}}
            placeholder="Amazon Web Services"
          />
        </label>

        <label>
          Year Earned
          <input
            type="number"
            value={{this.yearValue}}
            {{on "input" this.updateYear}}
            placeholder="2024"
            min="1900"
            max="2100"
          />
        </label>

        <div class="form-actions">
          <button type="submit">Save</button>
          <button type="button" {{on "click" this.cancel}}>Cancel</button>
        </div>
      </form>
    </div>
  </template>
}