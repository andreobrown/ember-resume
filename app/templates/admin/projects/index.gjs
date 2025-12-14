import { LinkTo } from '@ember/routing';

<template>
  <div class="admin-projects-list">
    <h1>Manage Projects</h1>

    <div class="actions">
      <LinkTo @route="admin.projects.new" class="btn-primary">+ Add Project</LinkTo>
      <LinkTo @route="admin.candidate.edit">← Back to Resume</LinkTo>
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
