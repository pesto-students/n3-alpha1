
# RAFFINATO APPAREL

![""](https://i.imgur.com/eYV4OWb.jpeg)

## Requirements

For development, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/pesto-students/n3-alpha1
    $ cd n3-alpha1
    $ npm install

### Configure app

This project is bootstrapped using [lerna](https://github.com/lerna/lerna), which is a tool for managing monorepos. Here are the packages needed to be configured for Raffinato. 

- backend API
- frontend app
- scraping API (optional)

## Bootstrap Lerna

    $ npn run clean // This will remove any *.lock files and residual node_modules
    $ npm bootstrap // This will install all the packages dependencies
    $ npm start // This will start both frontend & backend services

**Hint**: to start individual packages, use scoped start i.e `yarn start:web`

## Simple build for production

    $ npm run build:web

---

## Languages & tools

### Frontend

- React
- Redux ft. [Redux Toolkit](https://redux-toolkit.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Query](https://react-query.tanstack.com/)
- Firebase SDK
- SCSS
- Jest & React-Testing-Library
- StoryBook

### Backend

- Node & Express
- Firebase
- Stripe SDK

### Scraping

- [Puppeteer](https://github.com/puppeteer/puppeteer)


## Frequently (and not-so-frequently) Asked Questions

### Q. Why Framer?
A. To facilitate animation such as this with elegance and ease. (Notice how there was a route transition as well)
!["](https://s6.gifyu.com/images/screen-capture-2.gif)

### Q. Why SCSS?
A. SCSS makes writing CSS a breeze, with added nesting, mixins etc. At the same time, it reduces the runtime overhead of a CSS-in-JS library like Styled Components. That being said, there are some pitfalls of using SCSS (global support of variable, ever-increasing classes instead of dynamic props etc.)

### Q. What are the upcoming features beyond MVP?
A. A robust review/rating system, wishlisting system, adding more authentication options, expanding the design system.

### Q. How is CI/CD being handled in the monorepo?
A. **Frontend**: The CI/CD is being handled with [render](https://render.com/), which hosts our app as well. It creates a Pull Request Preview for every PR raised, so it becomes really easy to collaborate with peers. The `integration` branch is deployed automatically whenever there's a new commit.

**Backend**: Backend deployment is handled by Heroku, with the help of Github Actions. Similar to frontend, `integration` commits result in a fresh deployment triggered by GH Action & Heroku buildpack.

### Q. How is Task/Issue tracking being handled?
A. This is being handled by [Linear](https://linear.app), which is a great way to handle Sprints/Issue tracking for projects.
![""](https://i.imgur.com/IGQ8cDr.png)

### Q. Tell me a bit about the frontend architecture.
A. All our base components are part of our `design-system`, which can be viewed in Storybook (not all components have stories). They constitute the majority of our building blocks.
Pages are separated and so are the different kinds of routes (`InternalRoute/ProtectedRote` etc). SCSS global/config files are used to re-use our site-wide theme/layout units.