import Ember from 'ember';
import { Task } from 'ember-concurrency/-task-property';

const {
  A: emberArray,
  Helper,
  assert,
  computed,
  get,
  getOwner
} = Ember;

function getCurrentHandlerInfos(router) {
  let routerLib = router._routerMicrolib || router.router;

  return routerLib.currentHandlerInfos;
}

function getRoutes(router) {
  return emberArray(getCurrentHandlerInfos(router))
    .mapBy('handler')
    .reverse();
}

function getRouteWithTask(router, taskName) {
  for (const route of getRoutes(router)) {
    const task = get(route, taskName);
    if (task instanceof Task) {
      return { task, handler: route };
    }
  }

  return { task: null, handler: null };
}

export default Helper.extend({
  router: computed(function() {
    return getOwner(this).lookup('router:main');
  }).readOnly(),

  compute([taskName, ...params]) {
    let router = get(this, 'router');
    assert('[ember-route-task-helper] Unable to lookup router', router);

    const { task, handler } = getRouteWithTask(router, taskName);
    assert(`[ember-route-task-helper] Unable to find action ${taskName}`, handler);

    // FIXME
    // if (params.length) {
    //   return task._curry(...params);
    // }

    return task;
  }
});
