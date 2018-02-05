# db-run-migrations

Run database schema migrations.

## Getting started

Add the package to your project using the npm ecosystem:

```bash
$ npm install db-run-migrations --save-dev
```

Then setup the npm script via the `package.json` file.

```json
./package.json
"scripts": {
  "db:migrate": "./node_modules/.bin/db_run_migrations"
},
```

Now run the command:

```bash
$ npm run db:migrate
```

## Changelog

Get the project's history in [CHANGELOG.md](CHANGELOG.md).

## Maintainer

Andy Bettisworth <andy@accreu.com> https://andybettisworth.com

## License

This project is released under the [MIT License](LICENSE.txt).
