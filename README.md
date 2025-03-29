# Pat's Todo Application

A full-stack Todo application built with modern web technologies.

## Features

- User authentication via GitHub, GitLab, and Discord
- Create, read, update, and delete todos
- Due date tracking with visual indicators for overdue items
- Responsive design for mobile and desktop
- Real-time updates using TanStack Query

## Tech Stack

- **Frontend:**
  - Next.js 15
  - React 19
  - TanStack Query for data fetching
  - Shadcn UI components
  - Tailwind CSS for styling
  - TypeScript for type safety

- **Backend:**
  - Next.js API routes
  - NextAuth.js for authentication
  - Neon PostgreSQL for database

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install --force
```

3. Set up environment variables:
```env
DATABASE_URL=your_neon_database_url
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
GITLAB_ID=your_gitlab_oauth_id
GITLAB_SECRET=your_gitlab_oauth_secret
DISCORD_ID=your_discord_oauth_id
DISCORD_SECRET=your_discord_oauth_secret
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

The application uses a PostgreSQL database. Initialize it using the schema in [schema/create-schema-template.sql](schema/create-schema-template.sql).

## Project Structure

- `src/actions/` - Server actions for database operations
- `src/app/` - Next.js app router pages and layouts
- `src/components/` - React components including UI components
- `src/hooks/` - Custom React hooks for data fetching
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility functions

## Authentication

The app supports login via:
- GitHub
- GitLab
- Discord

Users must be authenticated to access the todo functionality.

## Development

To start developing:

1. Run the development server with Turbopack:
```bash
npm run dev
```

2. Run linting:
```bash
npm run lint
```

3. Build for production:
```bash
npm run build
```

## Deployment

This application can be deployed on Vercel:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure environment variables
4. Deploy

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
