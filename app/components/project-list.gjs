import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class ProjectListComponent extends Component {
  @action
  async delete(project) {
    if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
      try {
        await project.destroyRecord();
        alert('✅ Project deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting project: ' + error.message);
        console.error(error);
      }
    }
  }

  <template>
    <div class="admin-projects-list">
      <h1>Manage Projects</h1>

      <div class="actions">
        <LinkTo @route="admin.projects.new" class="btn-primary">+ Add Project</LinkTo>
        <LinkTo @route="index">← Back to Resume</LinkTo>
      </div>

      {{#if @model.length}}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Technologies</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {{#each @model as |project|}}
              <tr>
                <td>{{project.name}}</td>
                <td>{{project.description}}</td>
                <td>
                  {{#if project.technologies}}
                    {{#each project.technologies as |tech|}}
                      <span class="badge">{{tech}}</span>
                    {{/each}}
                  {{/if}}
                </td>
                <td>
                  {{#if project.url}}
                    <a href={{project.url}} target="_blank" rel="noopener noreferrer">Link</a>
                  {{/if}}
                </td>
                <td>
                  <LinkTo @route="admin.projects.edit" @model={{project}}>Edit</LinkTo>
                  |
                  <button type="button" {{on "click" (fn this.delete project)}}>Delete</button>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="empty-state">No projects yet. Click "Add Project" to create one.</p>
      {{/if}}
    </div>
  </template>
}

