# Project React front test

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node + Yarn

[Node](http://nodejs.org/) is really easy to install & now include [Yarn](https://classic.yarnpkg.com/en/).
You should be able to run the following command after the installation procedure
below.

    $ node -v
    v16.3.0

    $ yarn -v
    1.22.10

---

## Clone

    $ git clone git@github.com:hungvx-dev/react-front-test.git && cd react-front-test

## Install

    $ yarn install
    $ cd shared
    $ yarn install

### Configure app

You will need the environment variables. Copy.env.example to .env then edit it with the url api where you have setup:

    $ cp .env.example .env
    $ cd src/shared
    $ cp .env.example .env

---

## Start & watch

Move back to the root directory.

    $ yarn start

To Visit App:

`localhost:9000`

---

## Simple build for production

In root directory ``

    $ yarn build
