import Route from '@ember/routing/route';
import { task, timeout } from 'ember-concurrency';

export default class extends Route {
  taskOnApplicationRoute = task(function*(...args) {
    yield timeout(1000);
    return args;
  })
}
