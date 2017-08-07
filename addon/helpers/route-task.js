import Helper from '@ember/component/helper';
import { computed, get } from '@ember/object';
import { getRouter } from 'ember-route-task-helper/utils/router';
import { routeTaskFromRouter } from 'ember-route-task-helper/utils/route-task';

export default Helper.extend({
  router: computed(function() {
    return getRouter(this);
  }).readOnly(),

  compute([taskName, ...params]) {
    return routeTaskFromRouter(get(this, 'router'), taskName, ...params);
  }
});
