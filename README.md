# lint-staged-tsc

A small util for extending lint-staged.
It allows to run typescript type checking only for staged files

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Installation

Simply run:

```
npm i -D lint-staged-tsc
```

Or, if you are using Yarn:

```
yarn add -D lint-staged-tsc
```

# Usage

Paste `lint-staged-tsc` into your lint-staged config, i.e. :

```
{
    "lint-staged": {
        "**/*.{ts,tsx}": "lint-staged-tsc"
    }
}
```
