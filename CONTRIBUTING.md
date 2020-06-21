# Contributing Fisima

The following is a set of guidelines for contributing to Fisima and its packages. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table Of Contents

[How Can I Contribute?](#how-can-i-contribute)

- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Commits](#commits)
  - [Message Subject](#message-subject)
  - [Tpe](#type)
  - [Scope](#scope)
  - [Message Body](#message-body)
  - [Message Footer](#message-footer)
  - [Referencing Issues](#referencing-issues)
  - [Breaking Changes](#breaking-changes)
- [Pull Requests](#pull-requests)

[Additional Notes](#additional-notes)

- [Issue and Pull Request Labels](#issue-and-pull-request-labels)

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Fisima. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

When you are creating a bug report, please include as many details as possible. Fill out the required template, the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

### Suggesting Features

This section guides you through submitting an enhancement suggestion for Fisima, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

When you are creating an enhancement suggestion, please include as many details as possible Fill in the template, including the steps that you imagine you would take if the feature you're requesting existed.

### Commits

```text
<type>(<scope>): <subject>

<body>

<footer>
```

We are using **semantic commits messages** like our standard commit format. You can review more about the standard in some interesting urls:

- [Semantic commit message article](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Karma project commit style](https://karma-runner.github.io/0.10/dev/git-commit-msg.html)

#### Message Subject

First line cannot be longer than 70 characters, second line is always blank and other lines should be wrapped at 80 characters.

##### Type

Allowed **type** values:

- **feat** (new feature)
- **fix** (bug fix)
- **build** (bug fix)
- **ci** (bug fix)
- **perf** (bug fix)
- **docs** (changes to documentation)
- **style** (formatting, missing semi colons, etc; no code change)
- **refactor** (refactoring production code)
- **test** (adding missing tests, refactoring tests; no production code change)
- **chore** (updating grunt tasks etc; no production code change)

##### Scope

The **scope** can be empty (eg. if the change is a global or difficult to assign to a single component), in which case the parentheses are omitted.

#### Message body

- uses the imperative, present tense: “change” not “changed” nor “changes”
- includes motivation for the change and contrasts with previous behavior

#### Message footer

##### Referencing issues

Closed issues should be listed on a separate line in the footer prefixed with "Closes" keyword like this:

```text
Closes #234
```

or in case of multiple issues:

```text
Closes #123, #245, #992
```

##### Breaking changes

All breaking changes have to be mentioned in footer with the description of the change, justification and migration notes.

```text
BREAKING CHANGE:

`port-runner` command line option has changed to `runner-port`, so that it is
consistent with the configuration file syntax.

To migrate your project, change all the commands, where you use `--port-runner`
to `--runner-port`.
```

### Pull Requests

The process described here has several goals:

- Maintain Fisima's quality
- Fix problems that are important to users

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all fill instructions in [the template](https://github.com/Devnilson/fisima/blob/master/.github/pull_request_template.md)
2. Follow the styleguide.
3. After you submit your pull request, verify that all status checks are passing.

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Additional Notes

### Issue and Pull Request Labels

Please label correctly your issue or your pull request.

- **bug** (Related to writing or fixing test)
- **documentation** (Improvements or additions to project documentation)
- **draft** (This issue it's only a draft to be defined yet by fisima team)
- **feature** (New feature or request)
- **refactor** (Refactoring to project production code)
- **process** (Improvements or additions to project process)
- **question** (You only need to do a question to fisima community)
