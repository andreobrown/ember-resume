# Ember Resume

A personal resume/CV web application built to learn modern Ember.js.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Ember.js 6.8 with Vite |
| **Components** | Glimmer components (.gjs template tag format) |
| **Data** | EmberData with JSON:API adapter |
| **Auth** | ember-simple-auth with custom authenticator |
| **Backend** | Netlify Functions (serverless) |
| **Database** | Netlify DB (Neon Postgres) via Drizzle ORM |
| **Styling** | Vanilla CSS with custom properties |
| **Deployment** | Netlify (auto-deploy from GitHub) |

## Features

- Public resume display with work experience, education, certifications, projects
- Admin CRUD interface (protected by authentication)
- Bearer token auth for API endpoints
- Responsive design + print-friendly styles

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)

## Installation

```bash
git clone <repository-url>
cd ember-resume
npm install
```

## Local Development

```bash
npm run start
```

Visit [http://localhost:4200](http://localhost:4200)

### Environment Variables

Create a `.env` file for local development:

```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
AUTH_TOKEN=your_secret_token
```

### Database

```bash
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:seed      # Seed sample data
```

## Building

```bash
npm run build
```

## Deployment

Deployed automatically to Netlify on push to `main`. Environment variables are configured in the Netlify dashboard.

## Further Reading

- [Ember.js Guides](https://guides.emberjs.com/)
- [Ember.js API Docs](https://api.emberjs.com/)
- [ember-simple-auth](https://github.com/mainmatter/ember-simple-auth)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
