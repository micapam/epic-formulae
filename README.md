epic formulae
=============

Simple data store to house instances of the poetic device originating in oral
poetry known as a 'formula'. The purpose of this library is store a large number
of formulae, in order to devise metres that can accommodate them, in an
artifiical version of the historical process by which poetry came into
being[^1]. This is a personal project to assist in my creative research[^2].

Three elements are stored:

* the text of the formula
* a brief metrical notation using `u` per light and `-` per heavy syllable
* a simple description of the person or phenomenon to which the formula refers

## Prerequisites

* [NodeJS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

```sh-session
$ npm install -g epic-formulae
```

## Usage

Add a formula to the data store:

```sh-session
$ formula add -m '--uu' -r 'Zeus' 'loud-thundering'
```

Get a list of all formulae in markdown, grouped by metrical value

```sh-session
$ formula list
```

Get a list of all formulae in markdown, grouped by metrical value, restricted to
a maximum of the last four syllables (i.e. ignore prior syllables)

```sh-session
$ formula list -n 4
```

Get a list of all formulae in markdown, grouped by referent

```sh-session
$ formula list -g referent
```

Get a list of all formulae in CSV format

```sh-session
$ formula list -f csv
```

Load formula from a CSV file

```sh-session
$ formula load /path/to/my/file.csv
```

Try `formula add --help`, `formula list --help` and `formula load --help` for more options.

## Running in development

To run the local version just use `./bin/dev` instead of `formula`, e.g.:

```sh-session
$ ./bin/dev list -n 4
```

## Limitations

It is up to the user to ensure that the metrical notation is correct. Automating phonemic / prosodic analysis is out of scope of this project.

There is no ability to edit or remove formulae once they are added. Currently I'm just doing that using [the MongoDB shell](https://docs.mongodb.com/mongodb-shell/), e.g.:

```
db.formulae.updateOne(
  { text: 'loud-thundering' },
  { $set: { referent: 'Thor' }}
)
```

[^1]: According to Gregory Nagy: 'traditional phraseology generated meter rather than vice versa.' From 'Formula and Meter: A Summary' in _Comparative Studies in Greek and Indic Meter_ (Harvard University Press, 1974). [Online version at the Center for Hellenic Studies](https://chs.harvard.edu/chapter/6-formula-and-meter-a-summary/).

[^2]: I am a doctoral candidate at the [Writing and Society Research Centre](https://www.westernsydney.edu.au/writing_and_society/home) in western Sydney. I describe my research project [on my personal website](http://joshuamostafa.info/2020/08/danuquecla/).
