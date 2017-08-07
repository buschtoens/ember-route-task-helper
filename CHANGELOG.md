Changelog
=========

## v0.3.0

You can now use the `routeTask` and `routeTaskFromRouter` utils in your JS code ([#7](https://github.com/buschtoens/ember-route-task-helper/issues/7)).

#### Commits

- [4ce95510](https://github.com/buschtoens/ember-route-task-helper/commit/4ce955100a7d905352cab73307897274f6269b0c) **docs(README)**: add docs for util and best practice notes *by [Jan Buschtöns](https://github.com/buschtoens)*
- [ea82ac4f](https://github.com/buschtoens/ember-route-task-helper/commit/ea82ac4fdae20a9df71e5edb92efaa8da10011e0) **refactor(route-task)**: expose `routeTask` and `routeTaskFromRouter` *by [Jan Buschtöns](https://github.com/buschtoens)*
- [20b79607](https://github.com/buschtoens/ember-route-task-helper/commit/20b79607fdc16a90fbca1db5fe6d61a871f0136b) **test(route-task)**: fix failing tests in Ember <=2.12 *by [Jan Buschtöns](https://github.com/buschtoens)*
- [eaadbd52](https://github.com/buschtoens/ember-route-task-helper/commit/eaadbd52c09d4a5ab7d1cf85f81941d7cf045b69) **docs(README)**: fix incorrect code example *by [Jan Buschtöns](https://github.com/buschtoens)*
- [eba28c39](https://github.com/buschtoens/ember-route-task-helper/commit/eba28c395fd96bcfe6a0c2de91297629325ed6b9) **test(route-task)**: add meaningful tests *by [Jan Buschtöns](https://github.com/buschtoens)*
- [b715ad30](https://github.com/buschtoens/ember-route-task-helper/commit/b715ad30737496758fafd77e4ab53a80e4c46449) **fix(tests/helpers/start-app)**: use correct import for @ember/polyfills *by [Jan Buschtöns](https://github.com/buschtoens)*

## v0.2.1

The peer dependency on ember-concurrency was relaxed, so that NPM doesn't whine about versions above >=0.7.

#### Commits

- [f86e046c](https://github.com/buschtoens/ember-route-task-helper/commit/f86e046c0d957d94f407d08c45ac86963f15995f) **docs(README)**: add dem shiny badges *by [Jan Buschtöns](https://github.com/buschtoens)*
- [6feb8403](https://github.com/buschtoens/ember-route-task-helper/commit/6feb84035033310f716f4a081dcecd28f90520c4) **docs(README)**: inserted a missing indefinite article *by [Jan Buschtöns](https://github.com/buschtoens)*
- [282047a1](https://github.com/buschtoens/ember-route-task-helper/commit/282047a1a80d4eef37388ae7a2123eaf26cc2ae7) **test(route-task)**: skip, until we have some meaningful tests *by [Jan Buschtöns](https://github.com/buschtoens)*
- [2cb6c60d](https://github.com/buschtoens/ember-route-task-helper/commit/2cb6c60dbcc5fd6c397f43e529a1a5f85524f296) **docs(README)**: improve Usage section and add Contributing section *by [Jan Buschtöns](https://github.com/buschtoens)*

## v0.2.0

Currying via the `route-task` helper is now enabled.

```hbs
{{task-button
  task=(route-task "deleteUser" user)
}}

{{!-- instead of the unsightly --}}

{{task-button
  task=(task (route-task "deleteUser") user)
}}
```

#### Commits

- [11a71041](https://github.com/buschtoens/ember-route-task-helper/commit/11a71041d91da8d73430cc1d417c490734c2cb5d) **docs(README)**: fix Attribution links *by [Jan Buschtöns](https://github.com/buschtoens)*
- [ff591bc4](https://github.com/buschtoens/ember-route-task-helper/commit/ff591bc4bf85c982f35ca9cc1983b98c11311660) **docs(README)**: add Attribution section *by [Jan Buschtöns](https://github.com/buschtoens)*
- [4761896d](https://github.com/buschtoens/ember-route-task-helper/commit/4761896d2bf3ef8cb902c0154a57748325bc5e3c) **docs(README)**: fix spelling *by [Jan Buschtöns](https://github.com/buschtoens)*
- [06691e71](https://github.com/buschtoens/ember-route-task-helper/commit/06691e7139740f23e91a5ebecc76e262209d6d8c) **docs(README)**: add compatibility notes *by [Jan Buschtöns](https://github.com/buschtoens)*
- [77bfd9f9](https://github.com/buschtoens/ember-route-task-helper/commit/77bfd9f9aa1c70ec0e7a2ebe3ec82ddb6a993161) **docs(demo)**: showcase currying and little improvements *by [Jan Buschtöns](https://github.com/buschtoens)*
- [0cf7f8b8](https://github.com/buschtoens/ember-route-task-helper/commit/0cf7f8b80931c689418e86fadb90242f06206cde) **fix(route-task)**: enable currying *by [Jan Buschtöns](https://github.com/buschtoens)*
- [e850cf1b](https://github.com/buschtoens/ember-route-task-helper/commit/e850cf1b254e8d30fd34c6cb8e11f933e21eb65d) **refactor(route-task)**: use RFC 176 imports, rename some things *by [Jan Buschtöns](https://github.com/buschtoens)*

## 0.1.0

Initial proof of concept.
