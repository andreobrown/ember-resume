import EmberRouter from '@embroider/router';
import config from 'ember-quickstart/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('scientists');
  this.route('programmers');
  this.route('admin', function() {
    this.route('candidate', function() {
      this.route('edit');
    });
    this.route('projects', function() {
      this.route('new');
      this.route('edit', { path: ':project_id/edit' });

    });
  });
});
