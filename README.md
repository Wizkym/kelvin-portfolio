# Kelvin Mundi — Portfolio

Personal portfolio site for Kelvin Mundi, Senior Frontend Engineer specializing in Angular and enterprise financial applications. Live at [thek2mundy.com](https://www.thek2mundy.com).

## Objectives

- Present professional background, skills, work history, and projects in a polished single-page experience
- Provide a working contact form that delivers messages directly to the owner's inbox via AWS SES
- Serve as a foundation for ongoing experimentation with Angular modernization and AI-assisted development

## Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21 (standalone components, signals, reactive forms) |
| Styling | SCSS + Bootstrap 5 grid |
| Icons | IonIcons (legacy CSS font + v7 web components) |
| Backend | AWS Lambda (Node.js 20, TypeScript) + API Gateway HTTP API |
| Email | AWS SES via `@aws-sdk/client-ses` |
| Infrastructure | AWS Amplify Gen 2 (CDK-based, defined in `amplify/backend.ts`) |
| Hosting | AWS Amplify (CI/CD on push to `main`) |
| Build | Vite via `@angular/build:application` |
| Testing | Vitest |

## Project Structure

```
amplify/
  backend.ts                     CDK backend — HTTP API + SES IAM policy
  functions/send-contact/
    resource.ts                  defineFunction() — env vars
    handler.ts                   Lambda handler — validates + sends email via SES
src/
  app/
    core/                        Services, models, pipes
    features/                    Page sections (home, about, resume, portfolio, contact)
    layout/navbar/               Fixed navigation with modal triggers
    shared/                      Preloader, overlay effect
  styles.scss                    Global styles and design tokens
amplify_outputs.json             Generated backend config (API URL)
amplify.yml                      Amplify CI/CD build spec
```

## Local Development

```bash
npm install
npm start           # Angular dev server on http://localhost:4200
```

## Backend Deployment

The backend (Lambda + API Gateway) is managed by AWS Amplify Gen 2. To deploy or update it:

```bash
npx ampx sandbox --once   # Deploy to a personal AWS sandbox environment
```

After the first deploy, copy the output API URL into `amplify_outputs.json` and set `CONTACT_API_URL` as an environment variable in the Amplify console. Subsequent CI/CD builds inject it automatically via `amplify.yml`.

## Production Build

```bash
npm run build       # Output in dist/kelvin-portfolio/browser/
```

Deploys automatically on push to `main` via AWS Amplify CI/CD.
