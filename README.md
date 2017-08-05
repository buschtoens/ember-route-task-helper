# ember-route-task-helper

[![Build Status](https://travis-ci.org/buschtoens/ember-route-task-helper.svg)](https://travis-ci.org/buschtoens/ember-route-task-helper)
[![npm version](https://badge.fury.io/js/ember-route-task-helper.svg)](http://badge.fury.io/js/ember-route-task-helper)
[![Download Total](https://img.shields.io/npm/dt/ember-route-task-helper.svg)](http://badge.fury.io/js/ember-route-task-helper)
[![Ember Observer Score](https://emberobserver.com/badges/ember-route-task-helper.svg)](https://emberobserver.com/addons/ember-route-task-helper)
[![Greenkeeper badge](https://badges.greenkeeper.io/buschtoens/ember-route-task-helper.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/buschtoens/ember-route-task-helper/status.svg)](https://david-dm.org/buschtoens/ember-route-task-helper)
[![devDependencies Status](https://david-dm.org/buschtoens/ember-route-task-helper/dev-status.svg)](https://david-dm.org/buschtoens/ember-route-task-helper?type=dev)

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

Wherever in a template you would access a task by its name, replace it with
`(route-task "taskName")` and move that task to a route. For instance:

```hbs
{{task-button
  task=myTask
}}

{{!-- now becomes --}}

{{task-button
  task=(route-task "myTask")
}}
```

Notice the quotes around `"myTask"`.

You can also curry your tasks:

```hbs
{{task-button
  task=(task myTask "Freddie" "Morecurry")
}}

{{!-- now becomes --}}

{{task-button
  task=(route-task "myTask" "Freddie" "Morecurry")
}}
```

### Exemplary Migration

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

{{task-button
  task=(route-task "deleteUser" model)
  idleLabel=(concat "Delete " model.name)
  runningLabel="Cancel deletion"
}}
```

I personally dislike repeating `(route-task)` a bunch of times in my templates or even worse having to use the `(get)` helper to derive state from a task. You can avoid that by either only passing a task to a component (as shown in the `{{task-button}}` example above) or by using the `{{with}}` helper:

```hbs
{{#with (route-task "deleteUser" model) as |deleteUser|}}
  {{#if deleteUser.isIdle}}
    <button onclick={{perform deleteUser}}>
      Delete {{model.name}}
    </button>
  {{else}}
    Deleting {{model.name}} in 5 seconds. You can still abort.

    <button onclick={{cancel-all deleteUser}}>
      Nah, spare their life.
    </button>
  {{/if}}
{{/with}}
```

## Contributing

I sincerely hope this addon serves you well. Should you encounter a bug, have a great idea or just a question, please do [open an issue][new-issue] and let me know. Even better yet, submit a PR yourself! :blush:

This addon is using the [Prettier code formatter][prettier]. It's embedded as a fixable eslint rule. If you're editor is set up to fix eslint errors on save, you're code is auto formatted. If not, please make sure you're not getting any linter errors.

## Attribution

The original idea for this addon was brought up in [machty/ember-concurrency#89][issue-89] by [@Luiz-N][Luiz-n]. This addon is in many ways a straight copy and paste from [ember-route-action-helper][ember-route-action-helper] by [@DockYard][DockYard].

A huge **thank you** to goes out to [@machty][machty] for developing [ember-concurrency][ember-concurrency] in the first place. :heart:

[ember-concurrency]: https://github.com/machty/ember-concurrency
[ember-route-action-helper]: https://github.com/DockYard/ember-route-action-helper
[issue-89]: https://github.com/machty/ember-concurrency/issues/89
[Luiz-n]: https://github.com/Luiz-N
[DockYard]: https://github.com/DockYard
[machty]: https://github.com/machty
[new-issue]: https://github.com/buschtoens/ember-route-task-helper/issues/new
[prettier]: https://prettier.io/
