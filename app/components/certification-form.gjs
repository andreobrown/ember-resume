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
  updateDate(event) {
    const value = event.target.value;
    // Convert string to Date object, or null if empty
    this.args.model.dateEarned = value ? new Date(value) : null;
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

  // Format date for input field (YYYY-MM-DD)
  get dateValue() {
    if (!this.args.model.dateEarned) return '';
    const date = new Date(this.args.model.dateEarned);
    return date.toISOString().split('T')[0];
  }

  <template>
    <div class="certification-form">
      <h1>{{if @model.isNew "Add Certification" "Edit Certification"}}</h1>

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
          Date Earned
          <input
            type="date"
            value={{this.dateValue}}
            {{on "input" this.updateDate}}
          />
        </label>

        <div class="form-actions">
          <button type="submit">Save Certification</button>
          <button type="button" {{on "click" this.cancel}}>Cancel</button>
        </div>
      </form>
    </div>
  </template>
}