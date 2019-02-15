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
  let currentRoute = get(router, 'currentRoute');

  while (currentRoute) {
    const realRoute = owner.lookup(`route:${currentRoute.name}`);
    const task = get(realRoute, taskName);

    if (task instanceof Task) {
      return task;
    }

    currentRoute = currentRoute.parent;
  }

  return null;
}
