import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { Task } from 'ember-concurrency/-task-property';

export function routeTaskFromRouterService(router, taskName, ...params) {
  const task = findTaskInCurrentRouteHierarchy(router, taskName);
  assert(`[ember-route-task-helper] Unable to find task ${taskName}`, task);

  if (params.length) {
    return task._curry(...params);
  }

  return task;
}

export default function routeTask(context, taskName, ...params) {
  const router = getOwner(context).lookup('service:router');
  assert('[ember-route-task-helper] Unable to lookup router service', router);

  return routeTaskFromRouterService(router, taskName, ...params);
}

export function findTaskInCurrentRouteHierarchy(router, taskName) {
  const owner = getOwner(router);
  const routeSegments = get(router, 'currentRouteName').split('.');

  for (let i = routeSegments.length - 1; i >= 0; i--) {
    const routeName = routeSegments.slice(0, i).join('.') || 'application';
    const route = owner.lookup(`route:${routeName}`);
    const task = get(route, taskName);

    if (task instanceof Task) {
      return task;
    }
  }

  return null;
}
