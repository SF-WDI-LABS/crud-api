# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Super CRUD


## Base URL

<a href="https://super-crud.herokuapp.com" target="_blank">https://super-crud.herokuapp.com</a>

## Books Endpoint

| Request | URL | Action |
| :--- | :--- | :--- |
| GET | `/books` | READS all books |
| POST | `/books` | CREATES new book |
| GET | `/books/:id` | READS one book |
| PUT | `/books/:id` | UPDATES one book |
| DELETE | `/books/:id` | DELETES one book |

#### Sample Response

GET `/books`

```js
{
  books: [
    {
      _id: "563970891719c56cac83e5bb",
      title: "Around the World in 80 Days",
      author: "Jules Verne",
      image: "https://cloud.githubusercontent.com/assets/7833470/10892118/865bee3e-8156-11e5-9634-cd7bcd3d6d4f.jpg",
      releaseDate: "January 30, 1873",
      __v: 0
    },
    {
      _id: "563970891719c56cac83e5bc",
      title: "The Four Hour Workweek",
      author: "Tim Ferriss",
      image: "https://cloud.githubusercontent.com/assets/7833470/10892117/865b465a-8156-11e5-834b-9c4172d4b0fe.jpg",
      releaseDate: "April 1, 2007",
      __v: 0
    }
  ]
}
```

## Wines Endpoint

| Request | URL | Action |
| :--- | :--- | :--- |
| GET | `/wines` | READS all wines |
| POST | `/wines` | CREATES new wine |
| GET | `/wines/:id` | READS one wine |
| PUT | `/wines/:id` | UPDATES one wine |
| DELETE | `/wines/:id` | DELETES one wine |

#### Sample Response

GET `/wines`

```js
{
  wines: [
    {
      _id: "563970891719c56cac83e5c4",
      name: "Chateau Le Doyenne",
      year: "2005",
      country: "France",
      description: "Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
      image: "https://cloud.githubusercontent.com/assets/7833470/10892242/288a66cc-8157-11e5-8080-94b5847539e2.jpg",
      price: 12,
      __v: 0
    },
    {
      _id: "563970891719c56cac83e5c5",
      name: "Chateau de Saint Cosme",
      year: "2009",
      country: "France",
      description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
      image: "https://cloud.githubusercontent.com/assets/7833470/10892244/288afc2c-8157-11e5-8ae6-5a9e1c5ce6ac.jpg",
      price: 13,
      __v: 0
    }
  ]
}
```

## Pokemon Endpoint

| Request | URL | Action |
| :--- | :--- | :--- |
| GET | `/pokemon` | READS all pokemon |
| POST | `/pokemon` | CREATES new pokemon |
| GET | `/pokemon/:id` | READS one pokemon |
| PUT | `/pokemon/:id` | UPDATES one pokemon |
| DELETE | `/pokemon/:id` | DELETES one pokemon |

> Note that the word "pokemon" is both singular and plural.

#### Sample Response

GET `/pokemon`

```js
{
  pokemon: [
    {
      "name": "Bulbasaur",
      "pokedex": "001",
      "evolves_from": "Egg",
      "image": "https://upload.wikimedia.org/wikipedia/en/2/28/Pok%C3%A9mon_Bulbasaur_art.png"
    },
    {
      "name": "Venusaur",
      "pokedex": "003",
      "evolves_from": "Ivysaur",
      "image": "https://upload.wikimedia.org/wikipedia/en/d/dd/1200px-003Venusaur.png"
    }
  ]
}
```

## Reset Seed Data

<a href="http://super-crud.herokuapp.com/reset" target="_blank">http://super-crud.herokuapp.com/reset</a>


## Contribution/Maintenance 

### ESLint for Linting and Auto-fixing Linting Errors

This project uses [eslint](http://eslint.org/)! The base configuration is [standard JS](https://standardjs.com/), with additional rules as defined in [.eslintrc.json](.eslintrc.json).  

To run the linter on this project without changing files, use the following command line command:

```
./node_modules/eslint/bin/eslint.js ./
```

If you would like ESLint and standard to automatically fix linting issues, use the `--fix` option:


```
./node_modules/eslint/bin/eslint.js ./ --fix
```

Especially when using the --fix option, prefer to lint one file or directory at a time by specifying a path within the project:

```
./node_modules/eslint/bin/eslint.js ./controllers/index.js ./controllers/utils.js
```

As a shorthand to run the linter on the entire project directory, you can use `npm run lint`.

Ingored directories and files are listed in  [.eslintignore](.eslintignore).


### Automated Tests with Mocha, Chai, supertest

This project uses [mocha](https://mochajs.org/), [chai](http://chaijs.com/) for additional `expect` assertion styles, and [supertest](https://github.com/visionmedia/supertest) for HTTP request test runnign.  The command `npm test` runs all test code. Test files are in the `test` directory.

### Travis CI

Travis CI is enabled for this app. It will run tests and linting whenever a new push or a new pull request is made. Repo administrators can turn Travis on and off, and both admins and collaborators can control smaller-scale guides.  Travis is configured through the `travis.yml` file.  See Travis CI's [getting started guide[(https://docs.travis-ci.com/user/getting-started/) for information on how to control Travis' access to this repo through your admin or collaborator GitHub account.

### Heroku Deployment from `heroku` branch

The `heroku` branch is configured for easy deployment to heroku. See [Heroku's guide to GitHub integration / Heroku deploys](https://devcenter.heroku.com/articles/github-integration) for full information.  The integration is currently set up to allow easy manual deploys from the `heroku` branch, but admins can change this over to automatically deploy to Heroku if CI builds successfully.

When you want to deploy new versions to Heroku:

1. merge your changes into the `heroku` branch, 

2. check that Travis CI builds successfully, 

3. and then visit [the Super CRUD heroku dashboard](https://dashboard.heroku.com/apps/super-crud/deploy/github) to manually deploy the `heroku` branch.  

If you need permission to access the dashboard, seek SF WDI instructors. 
