# insta-organizer
Single-page webapp that pulls data from Instragram and help the user to organize his/her relationships.

Current version: 0.0.2

![](https://dl.dropboxusercontent.com/u/1089758/insta-organizer.png)

## Features
- As a user I can visualize the recent pictures (Wall section):
  - When I click on a pic, I can see:
    - bigger picture
    - comments, 
    - call-to-action to "like" it
- As a user I can visualize the relationships (Followers section):
  - who follows me 
  - who is following me 
  - if someone follows me but I don't follow him/her
    - I can follow them back
  - if I follow someone but this person doesn't follow me
    - I can unfollow them

## Techy Features

- General development features:
  - installation with one command-line
  - client:
    - AngularJS
    - Sass (Bourbon)
    - Gulp.js 
    - Bower
    - AngularUI
    - Unit test with Karma/Jasmine
  - server:
    - Node.js
    - MongoDB (Mongoose)
    - JWT
    - Satellizer
    - Request

## Getting Started

To get you started you can simply clone the insta-organizer repository and install the dependencies.

### Prerequisites

You need git to clone the insta-organizer repository. You can get it from
[git-scm.com/](http://git-scm.com/).

You must have node.js and its package manager (npm) installed. You can get them from [nodejs.org/](http://nodejs.org/).

MongoDB must be installed as well. You can get it from [mongodb.org](http://www.mongodb.org/downloads)

An instagram account :) [instagram.com](http://instagram.com/)

### Clone ng-organizer

Clone the insta-organizer:

```
$ git clone https://github.com/borteo/insta-organizer.git
$ cd insta-organizer
```

### Install Dependencies

There are two kinds of dependencies in this project: tools and libraries. The tools help to manage the application.

* We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.org/).
* We get the angular code via `bower`, a [client-side code package manager](http://bower.io/).
* `gulp` concatenates JavaScript, compiles Sass, move HTML and image files into client/dist/ [The streaming build system](http://gulpjs.com/).


I have preconfigured `npm` to automatically run `bower` so we can simply run:

```
$ npm install
```

Behind the scenes this will also call `bower install`. You should find that you have two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `bower_components` - contains the angular framework files


## Run the application

### Server

First you have to start mongodb: 

```
$ mongod
```

When mongo is up and running, open another tab (I use [iTerm](http://iterm2.com/)) and start insta-organizer server, running:

```
$ npm start
```

### Client

Firstly we have to build the application:

```
$ gulp
```

This command concatenates, uglifies, compress and moves all the files into the `dist` folder: `/client/dist`

The simplest way to start the client is to start a HTTP Server with Python (default port 8000). 

```
$ cd client/dist
$ python -m SimpleHTTPServer
```

At this point open browser and visit: `http://localhost:8000`


### Run tasks with gulp
- Run `gulp watch` for live compiling SCSS and JS
- Run `gulp build` for building
You can find all the tasks in the `gulp` folder

### Unit test
To test the models you can run:

```
$ npm test
```


### Instagram Token 
This project is using a dummy application created ad hoc for it, called `insta-organizer-dev`.

If you want to create your instagram application and use your credentials, you can change them here:

- `server/config/settings.js` contains the `clientSecret`
- `client/config/appConfig.js` contains the `clientId`


### TODO list
- I want deploy the project to divshot and mongoLab to make it live. (WIP: http://development.insta-organizer.divshot.io/)
- Write more (unit and E2E) tests.
- Redis would be a good solution to cache the user actions and the requests.
- I discovered that Instagram API allow only 20 actions per hour. (is there somehow a way to get more requests?)
- Follow action doesn't show if the request is pending (people have private Instagram accounts). 
- The wall should load more pictures when scrolling down. (not so much value on this - the user can go to Instagram)
- Create a dashboard with some infografics: %gender, top locations, # comments and other stats
