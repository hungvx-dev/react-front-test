1. [Requirements](#cequirements)
2. [Clone](#clone)
3. [Install](#install)
4. [Start & watch](#start)
5. [Build](#build)

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

    $ git clone git@bitbucket.org:team-card/mc-web.git
    $ cd mc-web

### Implement - My card sharing

    $ git submodule init
    $ git submodule add -f git@bitbucket.org:team-card/mc-data.git shared
    $ git config -f .gitmodules submodule.shared.branch develop
    $ git submodule foreach --recursive git pull origin develop

### Ignore new commits for git submodule

    $ git submodule update --init --force --remote

---

## Install

    $ yarn install
    $ cd src/shared
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

In root directory `src/app/web`

    $ yarn build
