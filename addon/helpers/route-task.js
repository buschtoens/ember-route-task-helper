import Helper from '@ember/component/helper';
import { A } from '@ember/array';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { Task } from 'ember-concurrency/-task-property';

function getCurrentHandlerInfos(router) {
  const routerLib = router._routerMicrolib || router.router;

  return routerLib.currentHandlerInfos;
}

function getCurrentRoutes(router) {
  return A(getCurrentHandlerInfos(router))
    .mapBy('handler')
    .reverse();
}

function findTaskInCurrentRouteHierarchy(router, taskName) {
  for (const route of getCurrentRoutes(router)) {
    const task = get(route, taskName);
    if (task instanceof Task) {
      return task;
    }
  }

  return null;
}

export default Helper.extend({
  router: computed(function() {
    return getOwner(this).lookup('router:main');
  }).readOnly(),

  compute([taskName, ...params]) {
    const router = get(this, 'router');
    assert('[ember-route-task-helper] Unable to lookup router', router);

    const task = findTaskInCurrentRouteHierarchy(router, taskName);
    assert(`[ember-route-task-helper] Unable to find task ${taskName}`, task);

    // FIXME
    // if (params.length) {
    //   return task._curry(...params);
    // }

    return task;
  }
});
