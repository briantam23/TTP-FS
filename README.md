[![Build Status](https://travis-ci.com/briantam23/TTP-FS.svg?token=qfoyGnbzJbjd9K4Z3Dnz&branch=master)](https://travis-ci.com/briantam23/TTP-FS)

# 📈 Stock Portfolio App

A Single Page Stock Portfolio App created with React, Redux, NodeJS & LESS.

## Login Credentials

* Email: `b@gmail.com`  | Password: `Briantam23@`
* Email: `j@gmail.com`   | Password: `Johnny34&`
* Email: `m@gmail.com` | Password: `Mike12#` 

## Live Demo

Currently deployed to [Heroku](https://ttp-fs-btam.herokuapp.com)!

## Setting up

This app requires an IEX API Key, which must be set in `.env` or set as an environment variable on `IEX_API_KEY`.

### Dependencies

* [React](https://reactjs.org)
* [Redux](https://redux.js.org)
* [LESS](http://lesscss.org)
* [PostgreSQL](https://www.postgresql.org)
* [Express](https://expressjs.com)

### Installation

* `createdb ttp-fs`
* `npm install` (or `yarn install`)
* `npm run start:dev`
* open up [localhost:3000](http://localhost:3000) in a web browser

The `run start:dev` command will run both the `webpack` process (in watch mode) to build your client-side Javascript files, and the Node process for your server with `nodemon`.