import Route from '@ember/routing/route';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class extends Route {
  @task
  taskOnApplicationRoute = function*(...args) {
    yield timeout(1000);
    return args;
  };
}
