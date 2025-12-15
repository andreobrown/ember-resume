import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class CertificationListComponent extends Component {
  @action
  async delete(certification) {
    if (confirm(`Are you sure you want to delete "${certification.name}"?`)) {
      try {
        await certification.destroyRecord();
        alert('✅ Certification deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting certification: ' + error.message);
        console.error(error);
      }
    }
  }

  // Format date to show year only
  formatYear(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.getFullYear().toString();
  }

  <template>
    <div class="admin-certifications-list">
      <h1>Manage Certifications & Courses</h1>

      <div class="actions">
        <LinkTo @route="admin.certifications.new" class="btn-primary">+ Add Certification/Course</LinkTo>
        <LinkTo @route="index">← Back to Resume</LinkTo>
      </div>

      {{#if @model.length}}
        <table>
          <thead>
            <tr>
              <th>Certification</th>
              <th>Issuer</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {{#each @model as |cert|}}
              <tr>
                <td>{{cert.name}}</td>
                <td>{{cert.issuer}}</td>
                <td>{{this.formatYear cert.dateEarned}}</td>
                <td>
                  <LinkTo @route="admin.certifications.edit" @model={{cert}}>Edit</LinkTo>
                  |
                  <button type="button" {{on "click" (fn this.delete cert)}}>Delete</button>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="empty-state">No certifications or courses yet. Click "Add Certification/Course" to create one.</p>
      {{/if}}
    </div>
  </template>
}