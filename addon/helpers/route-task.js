import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { routeTaskFromRouterService } from 'ember-route-task-helper/utils/route-task';

export default Helper.extend({
  router: service(),

  compute([taskName, ...params]) {
    return routeTaskFromRouterService(get(this, 'router'), taskName, ...params);
  }
});
