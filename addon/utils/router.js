import { A } from '@ember/array';
import { get } from '@ember/object';
import { getOwner } from '@ember/application';
import { Task } from 'ember-concurrency/-task-property';

export function getRouter(context) {
  return getOwner(context).lookup('router:main');
}

export function getCurrentHandlerInfos(router) {
  const routerLib = router._routerMicrolib || router.router;

  return routerLib.currentHandlerInfos;
}

export function getCurrentRoutes(router) {
  return A(getCurrentHandlerInfos(router))
    .mapBy('handler')
    .reverse();
}

export function findTaskInCurrentRouteHierarchy(router, taskName) {
  for (const route of getCurrentRoutes(router)) {
    const task = get(route, taskName);
    if (task instanceof Task) {
      return task;
    }
  }

  return null;
}
