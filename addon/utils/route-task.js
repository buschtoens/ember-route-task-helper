import Router from '@ember/routing/router';
import { assert } from '@ember/debug';
import {
  getRouter,
  findTaskInCurrentRouteHierarchy
} from 'ember-route-task-helper/utils/router';

export function routeTaskFromRouter(router, taskName, ...params) {
  assert(
    '[ember-route-task-helper] No router provided to `routeTaskFromRouter`',
    router instanceof Router
  );

  const task = findTaskInCurrentRouteHierarchy(router, taskName);
  assert(`[ember-route-task-helper] Unable to find task ${taskName}`, task);

  if (params.length) {
    return task._curry(...params);
  }

  return task;
}

export default function routeTask(context, taskName, ...params) {
  const router = getRouter(context);
  assert('[ember-route-task-helper] Unable to lookup router', router);

  return routeTaskFromRouter(router, taskName, ...params);
}
