# Session Token Website

![Session Token Logo](public/images/logo.png)

> Making Session possible.

## Getting Started

This project is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [SCSS](https://sass-lang.com/), [Sanity](https://www.sanity.io/), & [Typescript](https://www.typescriptlang.org/).

### System Requirements

- [Node.js 21.6.2](https://nodejs.org/) or later
- [Yarn 1](https://classic.yarnpkg.com/lang/en/)

### Setup

1. Install `yarn`

```bash
npm install yarn -g
```

1. Install dependencies

Using `--frozen-lockfile` makes sure that the environment is consistent on any machine by installing the exact package versions listed in the [yarn.lock](yarn.lock).

```bash
yarn install --frozen-lockfile
```

## Developing

Now you can run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Session homepage.

You can start editing the page by modifying pages in the `app/` directory. The page auto-updates as you edit the file.

The `app/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/app/building-your-application/routing) instead of React pages.

### Next.js

- Try to use the [next/image](https://nextjs.org/docs/api-reference/next/image) component in place of `img` tags where possible.
- If you want to make a link to a location on the website use the [next/link](https://nextjs.org/docs/api-reference/next/link) component with a relative path. i.e. `https://token.getsession.org/blog -> /blog`

## Deploying to Production

You can run the project in a production environment by running:

```bash
yarn build:production && yarn start:production
```

This will build the site with the production configuration and start the server. **Make sure to do this locally and check for errors before pushing any code changes to your hosted repository**

### Staging Environment

You can test the project in a staging environment by running:

```bash
yarn run build:staging && yarn run start:staging
```

This will build the site with the staging configuration and start the server.

## License

Distributed under the GNU GPLv3 License. See [LICENSE](LICENSE) for more information.
