# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the developer

I'm learning EmberJs with little prior experience writing full applications in JavaScript. My experience with JavaScript has been limited to deploying and managing JavaScript applications as a DevOps professional. However, I'm a developer with experience with Ruby on Rails.

## Working with the developer

When working with me, explain the EmberJS concepts that are being used. Relate them to Ruby on Rails concepts where relevant. Use Ruby on Rails ideas that are part of the framework, not external to it (e.g., avoid RSpec, use Minitest; avoid ViewComponents, use Rails Views with ERB etc.)

## Project Overview

This is an Ember.js application (Ember 6.9.0, Octane edition) using Embroider as the build system with Vite for compilation. The project uses Glimmer components with template tag format (.gjs files) and modern JavaScript features.

## Development Commands

**Start dev server:**
```bash
npm run start
```
Visit http://localhost:4200 for the app and http://localhost:4200/tests for tests.

**Run tests:**
```bash
npm run test  # Builds and runs all tests
```

**Build:**
```bash
npm run build                           # Production build
npm exec vite build --mode development  # Development build
```

**Linting:**
```bash
npm run lint      # Run all linters (JS, CSS, HBS, formatting)
npm run lint:fix  # Auto-fix all linting issues
```

Individual linters:
- `npm run lint:js` / `npm run lint:js:fix` - ESLint for JavaScript
- `npm run lint:hbs` / `npm run lint:hbs:fix` - Template linting
- `npm run lint:css` / `npm run lint:css:fix` - Stylelint for CSS
- `npm run format` - Prettier formatting

**Code generation:**
```bash
npm exec ember generate <blueprint> <name>
npm exec ember help generate  # See all available blueprints
```

## Architecture

**Build System:**
- Uses Embroider (modern Ember build system) with Vite as the bundler
- Configuration in `ember-cli-build.js` wraps the app with `compatBuild`
- Vite config at `vite.config.mjs` includes Ember-specific plugins and Babel

**Application Structure:**
- `app/app.js` - Main application class using Embroider resolver
- `app/router.js` - Route definitions (currently: scientists, programmers)
- `app/routes/` - Route handlers (.js files)
- `app/templates/` - Route templates (.gjs files using template-only components)
- `app/components/` - Reusable components (.gjs files)
- `config/environment.js` - Environment configuration (modulePrefix: 'ember-quickstart')

**Component Format:**
- Uses `.gjs` (Glimmer JavaScript) files with embedded `<template>` tags
- Components are Glimmer components (extend from `@glimmer/component`)
- Reactivity via `@tracked` decorator from `@glimmer/tracking`
- Template syntax uses `{{outlet}}` for route rendering and `{{#each}}` for iteration

**Key Configuration:**
- Module prefix: `ember-quickstart` (defined in config/environment.js)
- Ember Data configured with `DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false`
- Location type: `history` API for routing
- Test environment uses `locationType: 'none'` and auto-boots disabled

**Testing:**
- Tests in `tests/` directory
- Uses QUnit with ember-qunit and @ember/test-helpers
- Testem configured to run Chrome headless in CI
- Test command builds with Vite in development mode, then runs ember test with `--path dist`

## Important Notes

- The project name in package.json is `ember-quickstart` but the repo is `ember-resume` - this is the module prefix used throughout imports
- Template-only route templates are defined as `.gjs` files in `app/templates/`
- Components in `.gjs` format export a class with an embedded `<template>` section
- When importing from the app namespace, use `ember-quickstart/...` as the module prefix
