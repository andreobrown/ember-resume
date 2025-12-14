import EmberRouter from '@embroider/router';
import config from 'ember-resume/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('admin', function() {
    this.route('candidate', function() {
      this.route('edit');
    });
    this.route('projects', function() {
      this.route('new');
      this.route('edit', { path: ':project_id/edit' });

    });
    this.route('education', function() {
      this.route('new');
      this.route('edit', { path: ':education_id/edit' });
    });
    this.route('certifications', function() {
      this.route('new');
      this.route('edit', { path: ':certification_id/edit' });
    });
    this.route('work-experiences', function() {
      this.route('new');
      this.route('edit', { path: ':work_experience_id/edit' });

      // Nested routes for job titles
      this.route('job-titles', { path: ':work_experience_id/job-titles' }, function() {
        this.route('new');
        this.route('edit', { path: ':job_title_id/edit' });
      });
    });
  });
});
