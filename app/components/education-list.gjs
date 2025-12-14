import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class EducationListComponent extends Component {
  @action
  async delete(education) {
    if (confirm(`Are you sure you want to delete "${education.degree}"?`)) {
      try {
        await education.destroyRecord();
        alert('✅ Education deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting education: ' + error.message);
        console.error(error);
      }
    }
  }

  <template>
    <div class="admin-education-list">
      <h1>Manage Education</h1>

      <div class="actions">
        <LinkTo @route="admin.education.new" class="btn-primary">+ Add Education</LinkTo>
        <LinkTo @route="index">← Back to Resume</LinkTo>
      </div>

      {{#if @model.length}}
        <table>
          <thead>
            <tr>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Institution</th>
              <th>Graduation Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {{#each @model as |education|}}
              <tr>
                <td>{{education.degree}}</td>
                <td>{{education.fieldOfStudy}}</td>
                <td>{{education.institution}}</td>
                <td>{{education.graduationYear}}</td>
                <td>
                  <LinkTo @route="admin.education.edit" @model={{education}}>Edit</LinkTo>
                  |
                  <button type="button" {{on "click" (fn this.delete education)}}>Delete</button>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="empty-state">No education records yet. Click "Add Education" to create one.</p>
      {{/if}}
    </div>
  </template>
}

