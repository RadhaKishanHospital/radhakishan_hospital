# Deployment configuration

The application uses Vercel serverless functions for all `/api/*` requests.
The frontend and API therefore share the same origin in both local development
and deployed environments.

## Required Vercel environment variable

Set `MONGODB_URI` in **Project Settings → Environment Variables** for each
environment the application uses (Production, Preview, and Development). Use a
MongoDB Atlas connection string with the target database name included.

For Atlas, also allow Vercel to reach the cluster in **Network Access**. A
common production configuration permits `0.0.0.0/0` and relies on a dedicated
database user with a strong password and only the required database role.

After setting or changing the variable, redeploy the project. The API returns a
clear server error rather than silently falling back to sample data when the
database is not configured, so deployment configuration problems are visible.
