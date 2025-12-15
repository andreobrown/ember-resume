import Component from '@glimmer/component';
import { service } from '@ember/service';

class ResumeDisplay extends Component {
  @service session;

  <template>
    <div class="resume">
      {{#if @model.candidate}}
        <header class="resume-header">
          <h1>
            {{@model.candidate.name}}
            {{#if this.session.isAuthenticated}}
              <sup><a href="/admin/candidate/edit" class="edit-link">Edit</a></sup>
            {{/if}}
          </h1>
          <p class="tagline">{{@model.candidate.tagline}}</p>

          <div class="contact-info">
            {{#if @model.candidate.email}}
              <span>📧 {{@model.candidate.email}}</span>
            {{/if}}
            {{#if @model.candidate.phone}}
              <span>📱 {{@model.candidate.phone}}</span>
            {{/if}}
            {{#if @model.candidate.location}}
              <span>📍 {{@model.candidate.location}}</span>
            {{/if}}
          </div>

          <div class="links">
            {{#if @model.candidate.website}}
              <a href={{@model.candidate.website}} target="_blank" rel="noopener noreferrer">🌐 Website</a>
            {{/if}}
            {{#if @model.candidate.linkedin}}
              <a href={{@model.candidate.linkedin}} target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
            {{/if}}
          </div>
        </header>

        {{#if @model.candidate.profile}}
          <section class="profile">
            <h2>Profile</h2>
            <p>{{@model.candidate.profile}}</p>
          </section>
        {{/if}}

        {{#if @model.candidate.skills}}
          <section class="skills">
            <h2>Skills</h2>

            {{#if @model.candidate.skills.technical}}
              <div class="skill-category">
                <h3>Technical Skills</h3>
                <ul>
                  {{#each @model.candidate.skills.technical as |skill|}}
                    <li>{{skill}}</li>
                  {{/each}}
                </ul>
              </div>
            {{/if}}

            {{#if @model.candidate.skills.soft}}
              <div class="skill-category">
                <h3>Soft Skills</h3>
                <ul>
                  {{#each @model.candidate.skills.soft as |skill|}}
                    <li>{{skill}}</li>
                  {{/each}}
                </ul>
              </div>
            {{/if}}

            {{#if @model.candidate.skills.fun}}
              <div class="skill-category">
                <h3>Interests</h3>
                <ul>
                  {{#each @model.candidate.skills.fun as |skill|}}
                    <li>{{skill}}</li>
                  {{/each}}
                </ul>
              </div>
            {{/if}}
          </section>
        {{/if}}

        {{#if @model.workExperiences.length}}
          <section class="work-experiences">
            <h2>
              Work Experience
              {{#if this.session.isAuthenticated}}
                <sup><a href="/admin/work-experiences">Edit</a></sup>
              {{/if}}
            </h2>
            {{#each @model.workExperiences as |workExp|}}
              <div class="work-experience-item">
                <div class="work-experience-header">
                  <h3>{{workExp.company}}</h3>
                  {{#if workExp.location}}
                    <span class="location">{{workExp.location}}</span>
                  {{/if}}
                </div>

                {{#if workExp.jobTitles.length}}
                  <div class="job-titles">
                    {{#each workExp.jobTitles as |jobTitle|}}
                      <div class="job-title-item">
                        <strong>{{jobTitle.title}}</strong>
                        {{#if jobTitle.isLeadership}}
                          <span class="leadership-badge">Leadership</span>
                        {{/if}}
                        <span class="dates">
                          {{#if jobTitle.startDate}}
                            {{jobTitle.startDate}}
                          {{/if}}
                          {{#if jobTitle.endDate}}
                            - {{jobTitle.endDate}}
                          {{else}}
                            - Present
                          {{/if}}
                        </span>
                      </div>
                    {{/each}}
                  </div>
                {{/if}}

                {{#if workExp.responsibilities.length}}
                  <div class="responsibilities">
                    <h4>Responsibilities</h4>
                    <ul>
                      {{#each workExp.responsibilities as |resp|}}
                        <li>{{resp.content}}</li>
                      {{/each}}
                    </ul>
                  </div>
                {{/if}}

                {{#if workExp.achievements.length}}
                  <div class="achievements">
                    <h4>Key Achievements</h4>
                    <ul>
                      {{#each workExp.achievements as |achievement|}}
                        <li>{{achievement.content}}</li>
                      {{/each}}
                    </ul>
                  </div>
                {{/if}}
              </div>
            {{/each}}
          </section>
        {{/if}}

        {{#if @model.projects.length}}
          <section class="projects">
            <h2>
              Projects
              {{#if this.session.isAuthenticated}}
                <sup><a href="/admin/projects">Edit</a></sup>
              {{/if}}
            </h2>
            {{#each @model.projects as |project|}}
              <div class="project">
                <h3>{{project.name}}</h3>
                {{#if project.description}}
                  <p>{{project.description}}</p>
                {{/if}}
                {{#if project.technologies}}
                  <div class="technologies">
                    {{#each project.technologies as |tech|}}
                      <span class="tech-badge">{{tech}}</span>
                    {{/each}}
                  </div>
                {{/if}}
                {{#if project.url}}
                  <a href={{project.url}} target="_blank" rel="noopener noreferrer">View Project →</a>
                {{/if}}
              </div>
            {{/each}}
          </section>
        {{/if}}

        {{#if @model.education.length}}
          <section class="education">
            <h2>
              Education
              {{#if this.session.isAuthenticated}}
                <sup><a href="/admin/education">Edit</a></sup>
              {{/if}}
            </h2>
            {{#each @model.education as |edu|}}
              <div class="education-item">
                <h3>{{edu.degree}}{{#if edu.fieldOfStudy}} in {{edu.fieldOfStudy}}{{/if}}</h3>
                {{#if edu.institution}}
                  <p class="institution">{{edu.institution}}</p>
                {{/if}}
                {{#if edu.graduationYear}}
                  <p class="graduation-year">Graduated: {{edu.graduationYear}}</p>
                {{/if}}
              </div>
            {{/each}}
          </section>
        {{/if}}

        {{#if @model.certifications.length}}
          <section class="certifications">
            <h2>
              Certifications
              {{#if this.session.isAuthenticated}}
                <sup><a href="/admin/certifications">Edit</a></sup>
              {{/if}}
            </h2>
            {{#each @model.certifications as |cert|}}
              <div class="certification-item">
                <h3>{{cert.name}}</h3>
                {{#if cert.issuer}}
                  <p class="issuer">{{cert.issuer}}</p>
                {{/if}}
                {{#if cert.dateEarned}}
                  <p class="date-earned">Earned: {{cert.dateEarned}}</p>
                {{/if}}
              </div>
            {{/each}}
          </section>
        {{/if}}

        <footer>
          <p>Resume built with Ember.js</p>
        </footer>

      {{else}}
        <div class="empty-state">
          <h2>No Resume Data</h2>
          <p>Get started by adding your information.</p>
          <a href="/admin/candidate/edit">Create Your Resume</a>
        </div>
      {{/if}}
    </div>
  </template>
}

<template>
  <ResumeDisplay @model={{@model}} />
</template>
