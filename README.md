# ember-route-task-helper

The `route-task` template helper allows you to easily access tasks defined on a
route in the currently active route hierarchy. Essentially this addon is just
like [**ember-route-action-helper**][ember-route-action-helper] but for
[**ember-concurrency**][ember-concurrency] tasks.

## Installation

This addon will work on Ember versions `1.13.x` and up only, due to use of the
new `Helper` implementation.

```
ember install ember-route-task-helper
```

Of course, you need to have [**ember-concurrency**][ember-concurrency]
installed. If you haven't already, run this command first:

```
ember install ember-concurrency
```

Minimum required version is `0.6.x`.

## Usage

Let's start with a traditional task defined on a component.

```js
// app/components/delete-user.js
import Component from '@ember/component';
import { get } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extends({
  /**
   * A User record.
   * @type {DS.Model}
   */
  user: null,

  /**
   * Deletes the user after a timeout of 5 seconds.
   * @type {Task}
   */
  deleteUser: task(function*() {
    timeout(5000); // give the user time to think about it
    yield get(this, 'user').destroyRecord();
  }).drop()
});
```

```hbs
{{!-- app/templates/components/delete-user.hbs --}}

{{#if deleteUser.isIdle}}
  <button onclick={{perform deleteUser}}>
    Delete {{user.name}}
  </button>
{{else}}
  Deleting {{user.name}} in 5 seconds. You can still abort.

  <button onclick={{cancel-all deleteUser}}>
    Nah, spare their life.
  </button>
{{/if}}
```

And now we'll move it to a route, shall we?

```js
// app/routes/user.js
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Route.extends({
  /**
   * Deletes the current model after a timeout of 5 seconds.
   * @type {Task}
   */
  deleteUser: task(function*() {
    timeout(5000); // give the user time to think about it
    const user = this.modelFor(this.routeName);
    yield user.destroyRecord();
  }).drop()
});
```

```hbs
{{!-- app/templates/user.hbs --}}

{{#if (get (route-task "deleteUser") "isIdle")}}
  <button onclick={{perform (route-task "deleteUser")}}>
    Delete {{model.name}}
  </button>
{{else}}
  Deleting {{model.name}} in 5 seconds. You can still abort.

  <button onclick={{cancel-all (route-task "deleteUser")}}>
    Nah, spare their life.
  </button>
{{/if}}
```

Currying is also possible.

```js
// app/routes/user.js
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Route.extends({
  /**
   * Deletes the current model after a timeout of 5 seconds.
   * @type {Task}
   */
  deleteUser: task(function*(user) {
    timeout(5000); // give the user time to think about it
    yield user.destroyRecord();
  }).drop()
});
```

```hbs
{{!-- app/templates/user.hbs --}}

{{task-aware-button
  task=(route-task "deleteUser" model)
  idleLable=(concat "Delete " model.name)
  runningLable="Cancel deletion"
}}
```

[ember-concurrency]: https://github.com/machty/ember-concurrency
[ember-route-action-helper]: https://github.com/DockYard/ember-route-action-helper
