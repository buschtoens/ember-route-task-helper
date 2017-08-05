import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('test', function() {
    this.route('task-route', function() {
      this.route('no-task-route');
    });
    this.route('no-task-route');
  });
});

export default Router;
