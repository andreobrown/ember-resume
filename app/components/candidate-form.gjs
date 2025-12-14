import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class CandidateFormComponent extends Component {
  @service router;

  get skillsJSON() {
    return JSON.stringify(
      this.args.model.skills || { technical: [], soft: [], fun: [] },
      null,
      2
    );
  }

  @action
  updateField(fieldName, event) {
    this.args.model[fieldName] = event.target.value;
  }

  @action
  updateSkills(event) {
    try {
      this.args.model.skills = JSON.parse(event.target.value);
    } catch (e) {
      // Invalid JSON - ignore
    }
  }

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.args.model.save();
      this.router.transitionTo('index');
      alert('✅ Resume saved!');
    } catch (error) {
      alert('❌ Error: ' + error.message);
      console.error(error);
    }
  }

  <template>
    <div class="admin-edit">
      <h1>Edit Resume</h1>

      <form {{on "submit" this.save}}>
        <label>
          Name *
          <input
            type="text"
            value={{@model.name}}
            {{on "input" (fn this.updateField "name")}}
            required
          />
        </label>

        <label>
          Tagline
          <input
            type="text"
            value={{@model.tagline}}
            {{on "input" (fn this.updateField "tagline")}}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={{@model.email}}
            {{on "input" (fn this.updateField "email")}}
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            value={{@model.phone}}
            {{on "input" (fn this.updateField "phone")}}
          />
        </label>

        <label>
          Location
          <input
            type="text"
            value={{@model.location}}
            {{on "input" (fn this.updateField "location")}}
          />
        </label>

        <label>
          Website
          <input
            type="url"
            value={{@model.website}}
            {{on "input" (fn this.updateField "website")}}
          />
        </label>

        <label>
          LinkedIn
          <input
            type="url"
            value={{@model.linkedin}}
            {{on "input" (fn this.updateField "linkedin")}}
          />
        </label>

        <label>
          Profile
          <textarea
            value={{@model.profile}}
            {{on "input" (fn this.updateField "profile")}}
            rows="4"
          ></textarea>
        </label>

        <label>
          Skills (JSON)
          <textarea
            value={{this.skillsJSON}}
            {{on "input" this.updateSkills}}
            rows="6"
          ></textarea>
        </label>

        <button type="submit">Save</button>
        <a href="/">Cancel</a>
      </form>
    </div>
  </template>
}
