Changelog
=========

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
