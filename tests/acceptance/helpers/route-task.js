import { test, skip } from 'ember-qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { visit, click, find, waitUntil } from 'ember-native-dom-helpers';
import Component from '@ember/component';
import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import { task, timeout } from 'ember-concurrency';
import { Task } from 'ember-concurrency/-task-property';

moduleForAcceptance('Acceptance | main', {
  beforeEach(assert) {
    const TaskComponent = Component.extend({
      classNames: 'task-component',
      classNameBindings: ['isDone', 'isSuccessful'],

      task: null,
      args: null,
      expectedReturnValue: null,

      isDone: false,
      isSuccessful: false,

      async click() {
        const task = get(this, 'task');
        assert.ok(task, 'there is a `task` attribute present');
        assert.ok(task instanceof Task, '`task` is an instance of `Task`');

        const args = get(this, 'args') || [];
        const actualReturnValue = await task.perform(...args);

        run(() => set(this, 'isDone', true));

        const expectedReturnValue = get(this, 'expectedReturnValue');
        if (expectedReturnValue) {
          assert.deepEqual(
            expectedReturnValue,
            actualReturnValue,
            'task return value is correct'
          );
        }

        run(() => set(this, 'isSuccessful', true));
      }
    }).reopenClass({
      positionalParams: ['task', 'args', 'expectedReturnValue']
    });
    this.application.register('component:task-component', TaskComponent);

    const TaskRoute = Route.extend({
      TEST_TASK: task(function*(...params) {
        assert.ok(true, 'task was properly triggered on the route');
        yield timeout(10);
        return params;
      })
    });
    this.application.register('route:test.task-route', TaskRoute);
  }
});

test('it finds a task on the current route and can perform it', async function() {
  this.application.register(
    'template:test.task-route',
    hbs`{{task-component (route-task "TEST_TASK")}}`
  );

  await visit('/test/task-route');

  await click('.task-component');
  await waitUntil(() => find('.task-component.is-done'));
});

test('it finds a task on a parent route of the current route and can perform it', async function() {
  this.application.register(
    'template:test.task-route',
    hbs`{{task-component (route-task "TEST_TASK")}}`
  );

  await visit('/test/task-route/no-task-route');

  await click('.task-component');
  await waitUntil(() => find('.task-component.is-done'));
});

skip('it instantly throws an error, if the task cannot be found', async function() {
  this.application.register(
    'template:test.no-task-route',
    hbs`{{task-component (route-task "TEST_TASK")}}`
  );

  await visit('/test/no-task-route');
});

test('it can perform a task with arguments', async function() {
  this.application.register(
    'template:test.task-route',
    hbs`{{task-component
      (route-task "TEST_TASK")
      (array 1 2 3)
      (array 1 2 3)
    }}`
  );

  await visit('/test/task-route');

  await click('.task-component');
  await waitUntil(() => find('.task-component.is-done'));
});

test('it can perform a curried task', async function() {
  this.application.register(
    'template:test.task-route',
    hbs`{{task-component
      (route-task "TEST_TASK" "Freddie" "Morecurry")
      null
      (array "Freddie" "Morecurry")
    }}`
  );

  await visit('/test/task-route');

  await click('.task-component');
  await waitUntil(() => find('.task-component.is-done'));
});

test('it can perform a curried task with arguments', async function() {
  this.application.register(
    'template:test.task-route',
    hbs`{{task-component
      (route-task "TEST_TASK" "Freddie" "Morecurry")
      (array 1 2 3)
      (array "Freddie" "Morecurry" 1 2 3)
    }}`
  );

  await visit('/test/task-route');

  await click('.task-component');
  await waitUntil(() => find('.task-component.is-done'));
});
