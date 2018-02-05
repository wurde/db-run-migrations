#!/usr/bin/env node

"use strict"

/**
 * Dependencies
 */

const fs = require("fs")
const path = require("path")

/**
 * Constants
 */

const base = path.join(__dirname, "..", "..")
const package_json_path = path.join(base, 'package.json')
const index_js_path = path.join(base, 'index.js')

/**
 * Locals
 */

let main_script, app
let has_config = fs.existsSync(package_json_path)

/**
 * Set the main script to load
 */

if (has_config == false) {
  main_script = index_js_path
} else {
  let config = JSON.parse(fs.readFileSync(package_json_path))

  if (config.main === undefined || config.main === '') {
    main_script = index_js_path
  } else {
    main_script = path.resolve(config.main)
  }
}

/**
 * Load the main script
 */

if (fs.existsSync(main_script)) {
  app = require(main_script)

  /**
   * Require the db interface
   */

  if (!Object.keys(app.locals).includes('db')) {
    throw Error("Missing 'db' on app.locals {Object}."); return
  }

  /**
   * Require SchemaMigrations
   */

  const SchemaMigrations = require('schema-migrations')

  /**
   * Run migrations
   */

  let schema_migrations = new SchemaMigrations(base, app.locals.db)

  schema_migrations.run()
    .catch((err) => {
      console.error(err)
    })
} else {
  throw Error("Missing 'main' in package.json and missing an index.js file.")
}
