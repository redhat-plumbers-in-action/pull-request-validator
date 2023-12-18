<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="https://github.com/redhat-plumbers-in-action/team/blob/394d7f8e3441c7099f084d3843885cceb4617524/members/bordo-plumber.png" width="100" />
  <h1 align="center">Pull Request Validator</h1>
</p>

[![GitHub Marketplace][market-status]][market] [![Lint Code Base][linter-status]][linter] [![Unit Tests][test-status]][test] [![CodeQL][codeql-status]][codeql] [![Check dist/][check-dist-status]][check-dist]

[![codecov][codecov-status]][codecov]

<!-- Status links -->

[market]: https://github.com/marketplace/actions/pull-request-validator
[market-status]: https://img.shields.io/badge/Marketplace-Pull%20Request%20Validator-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=

[linter]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/lint.yml
[linter-status]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/lint.yml/badge.svg

[test]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/unit-tests.yml
[test-status]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/unit-tests.yml/badge.svg

[codeql]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/codeql-analysis.yml
[codeql-status]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/codeql-analysis.yml/badge.svg

[check-dist]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/check-dist.yml
[check-dist-status]: https://github.com/redhat-plumbers-in-action/pull-request-validator/actions/workflows/check-dist.yml/badge.svg

[codecov]: https://codecov.io/gh/redhat-plumbers-in-action/pull-request-validator
[codecov-status]: https://codecov.io/gh/redhat-plumbers-in-action/pull-request-validator/branch/main/graph/badge.svg

<!-- -->

Pull Request Validator is a GitHub Action that verifies if PR is reviewed and if the ci has passed. It will set labels and status check if something is missing or the Pull Request didn't pass through the Review.

## Features

* Set labels on Pull Request based on Review and CI status
* Status check on Pull Request

## Usage

To set up Pull Request Validator, we need two files:

* Workflow that captures Pull Request metadata (number and commit metadata) and uploads this data as an artifact
* Workflow that runs on `workflow-run` trigger, downloads artifact, and runs `pull-request-validator` GitHub Action
* Optionally we can set up `pull-request-validator.yml` configuration file

> [!NOTE]
>
> Setup is complicated due to GitHub [permissions on `GITHUB_TOKEN`](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token). When used in workflow executed from fork it has `read-only` permissions. By using the `workflow-run` trigger we are able to [safely overcome this limitation](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/) and it allows us to set labels and status checks on Pull Requests.

```yml
name: Gather Pull Request Metadata
on:
  pull_request:
    types: [ opened, reopened, synchronize ]
    branches: [ main ]

permissions:
  contents: read

jobs:
  gather-metadata:
    runs-on: ubuntu-latest

    steps:
      - name: Repository checkout
        uses: actions/checkout@v3

      - id: Metadata
        name: Gather Pull Request Metadata
        uses: redhat-plumbers-in-action/gather-pull-request-metadata@v1

      - name: Upload artifact with gathered metadata
        uses: actions/upload-artifact@v3
        with:
          name: pr-metadata
          path: ${{ steps.Metadata.outputs.metadata-file }}
```

```yml
name: Pull Request Validator
on:
  workflow_run:
    workflows: [ Gather Pull Request Metadata ]
    types:
      - completed

permissions:
  contents: read

jobs:
  download-metadata:
    if: >
      github.event.workflow_run.event == 'pull_request' &&
      github.event.workflow_run.conclusion == 'success'
    runs-on: ubuntu-latest

    outputs:
      pr-metadata: ${{ steps.Artifact.outputs.pr-metadata-json }}

    steps:
      - id: Artifact
        name: Download Artifact
        uses: redhat-plumbers-in-action/download-artifact@v1
        with:
          name: pr-metadata

  pull-request-validator:
    needs: [ download-metadata ]
    runs-on: ubuntu-latest

    permissions:
      # required for status checks
      checks: write
      # required for setting labels
      pull-requests: write

    steps:
      - name: Pull Request Validator
        uses: redhat-plumbers-in-action/pull-request-validator@v1
        with:
          pr-metadata: ${{ needs.download-metadata.outputs.pr-metadata }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Configuration options

Action currently accepts the following options:

```yml
# ...

- uses: redhat-plumbers-in-action/pull-request-validator@v1
  with:
    pr-metadata:  <pr-metadata.json>
    config-path:  <path to config file>
    token:        <GitHub token or PAT>

# ...
```

### pr-metadata

Stringified JSON Pull Request metadata provided by GitHub Action [`redhat-plumbers-in-action/gather-pull-request-metadata`](https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata).

Pull Request metadata has the following format: [metadata format](https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata#metadata)

* default value: `undefined`
* requirements: `required`

### config-path

Path to configuration file. Configuration file format is described in: [Policy section](#policy).

* default value: `.github/pull-request-validator.yml`
* requirements: `optional`

### token

GitHub token or PAT is used for creating comments on Pull Request and setting checks.

```yml
# required permission
permissions:
  checks: write
  pull-requests: write
```

* default value: `undefined`
* requirements: `required`
* recomended value: `secrets.GITHUB_TOKEN`

## Policy

Action is configured using special policy file: `.github/pull-request-validator.yml`. The structure needs to be as follows:

```yml
labels:
  missing-review: needs-review
  changes-requested: changes-requested
  missing-failing-ci: needs-ci
  waiving-failing-ci: ci-waived
ignore-checks:
  - Bad CI
  - Super Bad CI
```

When the policy file isn't provided, the action uses the default policy:

```yml
labels:
  missing-review: pr/missing-review
  changes-requested: pr/changes-requested
  missing-failing-ci: pr/failing-ci
  waiving-failing-ci: ci-waived
# The following checks are a part of source-git automation toolchain
# They should be ignored to avoid incorrect CI validation
ignore-checks:
  - Pull Request Validator
  - Advanced Commit Linter
  - Tracker Validator
  - Auto Merge
```

### `labels` keyword

Allows you to set custom labels for certain conditions.

#### `missing-review` keyword

The name of the label that will be set when the Pull Request is missing a MEMBER review.

* default value: `pr/missing-review`

#### `changes-requested` keyword

The name of the label that will be set when the Pull Request has a CHANGES_REQUESTED review.

* default value: `pr/changes-requested`

#### `missing-failing-ci` keyword

The name of the label that will be set when the Pull Request has a failing CI.

* default value: `pr/failing-ci`

#### `waiving-failing-ci` keyword

The name of the label that can be used to waive failing CI.

* default value: `ci-waived`

### `ignore-checks[]` keyword

Allows you to ignore certain checks when validating the Pull Request. This is useful when you have a CI that is not required to pass for the Pull Request to be merged.

* default value: `['Pull Request Validator', 'Advanced Commit Linter', 'Tracker Validator', 'Auto Merge']`

## Limitations

* Reviews from members that have private membership are not supported, they are not visible to the GitHub Actions.
* Status checks from Pull Request Validator are randomly assigned to check suites, GitHub API for check suites doesn't provide a way to assign a check to a specific suite.
