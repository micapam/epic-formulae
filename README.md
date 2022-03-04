epic formulae
=============

Simple data store to house instances of the poetic device originating in oral poetry known as a 'formula'. The purpose of this library is store a large number of formulae, in order to devise metres that can accommodate them, in an artifical version of the historical process by which poetry came into being[^1]. This is a personal project to assist in my creative research[^2].

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

Get a list of all formulae in markdown, grouped by referent

```sh-session
$ formula list
```

Get a list of all formulae in markdown, grouped by metrical value

```sh-session
$ formula list -g metre
```

Get a list of all formulae in CSV format

```sh-session
$ formula list -f csv
```

Try `formula add --help` and `formula list --help` for more options.

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
