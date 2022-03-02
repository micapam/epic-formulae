oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g epic-formulae
$ formula COMMAND
running command...
$ formula (--version)
epic-formulae/0.0.0 darwin-x64 node-v17.5.0
$ formula --help [COMMAND]
USAGE
  $ formula COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`formula hello PERSON`](#formula-hello-person)
* [`formula hello world`](#formula-hello-world)
* [`formula help [COMMAND]`](#formula-help-command)
* [`formula plugins`](#formula-plugins)
* [`formula plugins:inspect PLUGIN...`](#formula-pluginsinspect-plugin)
* [`formula plugins:install PLUGIN...`](#formula-pluginsinstall-plugin)
* [`formula plugins:link PLUGIN`](#formula-pluginslink-plugin)
* [`formula plugins:uninstall PLUGIN...`](#formula-pluginsuninstall-plugin)
* [`formula plugins update`](#formula-plugins-update)

## `formula hello PERSON`

Say hello

```
USAGE
  $ formula hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/micapam/epic-formulae/blob/v0.0.0/dist/commands/hello/index.ts)_

## `formula hello world`

Say hello world

```
USAGE
  $ formula hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `formula help [COMMAND]`

Display help for formula.

```
USAGE
  $ formula help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for formula.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `formula plugins`

List installed plugins.

```
USAGE
  $ formula plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ formula plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `formula plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ formula plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ formula plugins:inspect myplugin
```

## `formula plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ formula plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ formula plugins add

EXAMPLES
  $ formula plugins:install myplugin 

  $ formula plugins:install https://github.com/someuser/someplugin

  $ formula plugins:install someuser/someplugin
```

## `formula plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ formula plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ formula plugins:link myplugin
```

## `formula plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ formula plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ formula plugins unlink
  $ formula plugins remove
```

## `formula plugins update`

Update installed plugins.

```
USAGE
  $ formula plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
