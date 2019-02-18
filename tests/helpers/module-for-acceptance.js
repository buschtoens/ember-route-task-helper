import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function(name, options = {}) {
  module(name, {
    beforeEach(...args) {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach.call(this, args);
      }
    },

    afterEach(...args) {
      const afterEach = options.afterEach && options.afterEach.call(this, args);
      return resolve(afterEach).then(() => destroyApp(this.application));
    }
  });
}
