## Frontend – Massyve (Next.js)
This is the frontend portion of the Massyve web app, built with Next.js, Axios, and Tailwind CSS. It handles user authentication, global context, and routing between login and dashboard views.

## Project Structure

src/
└── app/
    ├── bin/
    │   └── client.ts           # Axios instance with token interceptor
    ├── context/
    │   └── page.tsx            # Auth context provider & hook
    ├── login/
    │   └── page.tsx            # Login page with form and animation
    ├── dashboard/
    │   └── page.tsx            # Dashboard with dynamic greeting & logout
    └── page.tsx                # Root route: conditionnaly redirects to login or dashboard
.env.deployment
.env.development

Technologies Used
Next.js (App Router)

React Context API – for managing auth state

Axios – with Bearer token interceptor

Tailwind CSS – utility-first styling

React Spinners – loading indicators

React Type Animation – animated header text

## Authentication Flow
JWT token is stored in localStorage.

On app load, AuthProvider checks for token and fetches the user via /auth/me.

All outgoing Axios requests automatically include the Bearer token via an interceptor.

Users are redirected between login and dashboard based on auth status.

## Auth Context Hook

// useAuth() provides:
{
  user: User | null;
  loading: boolean;
  login: (credentials) => Promise<void>;
  logout: () => void;
}