import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class WorkExperienceListComponent extends Component {
  @action
  async delete(workExperience) {
    if (confirm(`Are you sure you want to delete "${workExperience.company}"? This will also delete all related job titles, responsibilities, and achievements.`)) {
      try {
        await workExperience.destroyRecord();
        alert('✅ Work experience deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting work experience: ' + error.message);
        console.error(error);
      }
    }
  }

  <template>
    <div class="admin-work-experiences-list">
      <h1>Manage Work Experience</h1>

      <div class="actions">
        <LinkTo @route="admin.work-experiences.new" class="btn-primary">+ Add Work Experience</LinkTo>
        <LinkTo @route="index">← Back to Resume</LinkTo>
      </div>

      {{#if @model.length}}
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {{#each @model as |experience|}}
              <tr>
                <td>{{experience.company}}</td>
                <td>{{experience.location}}</td>
                <td>
                  <LinkTo @route="admin.work-experiences.edit" @model={{experience}}>Edit</LinkTo>
                  |
                  <button type="button" {{on "click" (fn this.delete experience)}}>Delete</button>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="empty-state">No work experience yet. Click "Add Work Experience" to create one.</p>
      {{/if}}
    </div>
  </template>
}