import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { array } from '@ember/helper';

export default class ResponsibilityListComponent extends Component {
  @action
  async delete(responsibility) {
    if (confirm('Are you sure you want to delete this responsibility?')) {
      try {
        await responsibility.destroyRecord();
        alert('✅ Responsibility deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting responsibility: ' + error.message);
        console.error(error);
      }
    }
  }

  <template>
    <div class="responsibilities-section">
      <h2>Responsibilities</h2>

      <div class="actions">
        <LinkTo
          @route="admin.work-experiences.responsibilities.new"
          @model={{@workExperience}}
          class="btn-secondary"
        >
          + Add Responsibility
        </LinkTo>
      </div>

      {{#if @model.length}}
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Sort Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {{#each @model as |responsibility|}}
              <tr>
                <td>{{responsibility.content}}</td>
                <td>{{responsibility.sortOrder}}</td>
                <td>
                  <LinkTo
                    @route="admin.work-experiences.responsibilities.edit"
                    @models={{array @workExperience responsibility}}
                  >
                    Edit
                  </LinkTo>
                  |
                  <button type="button" {{on "click" (fn this.delete responsibility)}}>Delete</button>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="empty-state">No responsibilities yet. Add one to get started.</p>
      {{/if}}
    </div>
  </template>
}
