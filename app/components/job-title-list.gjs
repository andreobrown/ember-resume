import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { array } from '@ember/helper';

export default class JobTitleListComponent extends Component {
  @action
  async delete(jobTitle) {
    if (confirm(`Are you sure you want to delete "${jobTitle.title}"?`)) {
      try {
        await jobTitle.destroyRecord();
        alert('✅ Job title deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting job title: ' + error.message);
        console.error(error);
      }
    }
  }

  // Format date for display
  formatDate(date) {
    if (!date) return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  <template>
    <div class="job-titles-section">
      <h2>Job Titles</h2>

      <div class="actions">
        <LinkTo
          @route="admin.work-experiences.job-titles.new"
          @model={{@workExperience}}
          class="btn-secondary"
        >
          + Add Job Title
        </LinkTo>
      </div>

      {{#if @model.length}}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leadership</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {{#each @model as |jobTitle|}}
              <tr>
                <td>{{jobTitle.title}}</td>
                <td>{{this.formatDate jobTitle.startDate}}</td>
                <td>{{this.formatDate jobTitle.endDate}}</td>
                <td>{{if jobTitle.isLeadership "Yes" "No"}}</td>
                <td>
                  <LinkTo
                    @route="admin.work-experiences.job-titles.edit"
                    @models={{array @workExperience jobTitle}}
                  >
                    Edit
                  </LinkTo>
                  |
                  <button type="button" {{on "click" (fn this.delete jobTitle)}}>Delete</button>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="empty-state">No job titles yet. Add one to get started.</p>
      {{/if}}
    </div>
  </template>
}
