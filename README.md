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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Files for Rate-Limit (Upstash)

The following files are related to rate-limiting implementation using Upstash:

### Configuration and Logic:

- env.local and env.example
- database\redis.ts
- lib\actions\auth.ts
- lib\config.ts
- lib\ratelimit.ts
- app/too-fast

### Installed Packages:

- "@upstash/ratelimit": "^2.0.5",
- "@upstash/redis": "^1.34.8",

## Files for Auth (using NextAuth.js)

The following files are related to authentication (Auth.js) implementation:

### Authentication Logic

- auth.ts
- lib/actions/auth.ts
- app/api/auth/[...nextauth]/route.ts
- middleware.ts

### Environment Configuration:

- env.local and env.example

### Database:

- database/schema.ts

### Validation and Utility Functions:

- lib/validations.ts
- lib/utils.ts

### Pages & Layouts:

- app/(auth)/layout.tsx
- app/(auth)/sign-in/page.tsx
- app/(root)/layout.tsx
- app/layout.tsx

### Components:

- components/AuthForm.tsx
- components/LogOutBtn.tsx
- components/Avatar.tsx
- components/Header/Header.tsx
- components/Header/MobileHeader.tsx

### Types:

- types.d.ts

### Installed Packages:

- "next-auth": "^5.0.0-beta.25",
- "bcryptjs": "^3.0.2",
- "@radix-ui/react-avatar": "^1.1.7",
