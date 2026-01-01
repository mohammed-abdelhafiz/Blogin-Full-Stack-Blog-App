# Modern Full-Stack Blog Platform

A powerful, real-time blog application built with the bleeding-edge stack of Next.js 16, Convex, and TailwindCSS v4. This project demonstrates a production-ready architecture with fast server-side rendering, real-time database updates, and a responsive, beautiful UI.

## 🌟 Key Features

- **🚀 Modern Stack**: Built with Next.js 16 (App Router) and React 19.
- **💾 Real-time Backend**: Powered by [Convex](https://convex.dev) for instant data syncing and serverless functions.
- **🎨 Premium UI**: Styled with TailwindCSS v4 and Radix UI primitives for a polished, responsive look.
- **🔒 Authentication**: Secure user authentication handled by Better Auth.
- **📝 Rich Content**: Blog articles with image support (Convex Storage).
- **🔍 Full-Text Search**: Instant search capabilities for articles titles and content.
- **💬 Real-time Comments**: Interactive commenting system that updates instantly.
- **⚡ Optimistic UI**: Smooth user interactions with optimistic updates.
- **📱 Responsive Design**: Optimized for all devices, from mobile to desktop.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org), [React 19](https://react.dev), [TailwindCSS](https://tailwindcss.com)
- **Backend & Database**: [Convex](https://convex.dev)
- **Authentication**: [Better Auth](https://better-auth.com) / [@convex-dev/better-auth](https://www.npmjs.com/package/@convex-dev/better-auth)
- **Forms**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Icons**: [Lucide React](https://lucide.dev)
- **Utilities**: `dayjs`, `clsx`, `cva`

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn/bun)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Convex**

   Initialize your Convex project. This will prompt you to log in and configure your project credentials.

   ```bash
   pnpm dlx convex dev
   ```

   This command will also generate the necessary environment variables in `.env.local`.

4. **Run the Development Server**

   Open a new terminal window (keep `convex dev` running) and start the Next.js app:

   ```bash
   pnpm run dev
   ```

5. **Open the App**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `(shared-layout)/`: Routes sharing the main application layout (Header, etc.).
  - `auth/`: Authentication related pages.
- `convex/`: Backend modules.
  - `schema.ts`: Database schema definition.
  - `blogArticles.ts`: Logic for handling blog posts.
  - `comments.ts`: Logic for comments.
- `components/`: Reusable React components.
- `lib/`: Utility functions and shared helpers.

## 📜 Database Schema

The core data models defined in `convex/schema.ts`:

- **blogArticles**: Stores blog titles, content, author IDs, and image references.
- **comments**: Stores comments linked to specific articles.

## 🤝 Contributing

Contributions are welcome! Please look at the [issues](issues) directory or feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
