# lint-staged-tsc

[![Package version](https://img.shields.io/npm/v/lint-staged-tsc.svg)](https://www.npmjs.com/package/lint-staged-tsc)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> A small util for extending lint-staged.  
> It allows to run typescript type checking only for staged files.

## 🧰 Installation

Simply run:

```
npm i -D lint-staged-tsc
```

Or, if you are using Yarn:

```
yarn add -D lint-staged-tsc
```

## 🛠️ Usage

Paste `lint-staged-tsc` into your lint-staged config, i.e. :

```
{
    "lint-staged": {
        "**/*.{ts,tsx}": "lint-staged-tsc"
    }
}
```

## 💡 Motivation

When you use lint-staged to perform typescript checking, i.e. `"**/*.{ts,tsx}": "tsc --noEmit"` , typescripts checks all files in your project. In bigger projects it can take long time, and you can also have uncommited files with work in progress.  
This util allows to run typescript type checking for staged files only. It will also take into account your custom type declarations.

## Author

👤 **Konrad Gorski**

- Github: [@Kontenty](https://github.com/Kontenty)
- LinkedIn: [@konrad-gorski-frontend](https://linkedin.com/in/konrad-gorski-frontend)
