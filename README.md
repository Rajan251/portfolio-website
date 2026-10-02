This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

The repository includes `netlify.toml` with the project root as the base directory, `npm run build` as the build command, and `.next` as the publish directory. These settings ensure Netlify builds the application instead of publishing the source files as a static site.

Netlify automatically detects Next.js and installs its framework adapter to serve pages, dynamic product routes, and optimized images. Do not change the publish directory to `public` or add a single-page-app redirect to `/index.html`; this application uses Next.js routing rather than a static HTML entry point.

Deploy the updated repository on Netlify, then verify `/`, `/shop`, and `/product/lum-01` by opening each URL directly. Configuration changes take effect on the next deploy, not on the currently published site.
