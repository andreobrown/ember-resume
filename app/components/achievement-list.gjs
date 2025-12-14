import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { array } from '@ember/helper';

export default class AchievementListComponent extends Component {
  @action
  async delete(achievement) {
    if (confirm('Are you sure you want to delete this achievement?')) {
      try {
        await achievement.destroyRecord();
        alert('✅ Achievement deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting achievement: ' + error.message);
        console.error(error);
      }
    }
  }

  <template>
    <div class="achievements-section">
      <h2>Achievements</h2>

      <div class="actions">
        <LinkTo
          @route="admin.work-experiences.achievements.new"
          @model={{@workExperience}}
          class="btn-secondary"
        >
          + Add Achievement
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
            {{#each @model as |achievement|}}
              <tr>
                <td>{{achievement.content}}</td>
                <td>{{achievement.sortOrder}}</td>
                <td>
                  <LinkTo
                    @route="admin.work-experiences.achievements.edit"
                    @models={{array @workExperience achievement}}
                  >
                    Edit
                  </LinkTo>
                  |
                  <button type="button" {{on "click" (fn this.delete achievement)}}>Delete</button>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="empty-state">No achievements yet. Add one to get started.</p>
      {{/if}}
    </div>
  </template>
}
