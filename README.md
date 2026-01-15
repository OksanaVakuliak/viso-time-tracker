# VISO Time Tracker

A modern, full-stack internal tool designed for efficient time tracking, project management, and daily task logging. Built with performance and user experience in mind.

## 🚀 Features

- **Intuitive Dashboard**: Clean landing page with quick access to key features.
- **Dynamic Routing**: Multi-page architecture (Home, Add Entry, History) using Next.js App Router.
- **Real-time Feedback**: Success notifications and smooth transitions using Ant Design's `message` system.
- **Robust Validation**: Client-side form validation powered by **Zod** and **React Hook Form**.
- **Type Safety**: Fully written in **TypeScript** for reliable and maintainable code.
- **Clean UI**: Built with **Ant Design 5.0** and **CSS Modules** for a professional look and feel.
- **Database Integration**: Persistent storage using **Prisma ORM** and **SQLite**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI Library**: [Ant Design](https://ant.design/)
- **State & Forms**: React Hook Form, Zod
- **Backend**: Next.js API Routes, Axios
- **Database**: Prisma ORM, SQLite
- **Styling**: CSS Modules

## 📦 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/OksanaVakuliak/viso-time-tracker](https://github.com/OksanaVakuliak/viso-time-tracker)
   cd viso-time-tracker

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **Setup the database:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   Open http://localhost:3000 with your browser to see the result.
   ```

## 🏗️ Architecture

- The project follows a modular architecture for better scalability:

- /app: Contains the application's routes, global layout, and server components.

- /components: Reusable UI components (Header, Form, History) with isolated CSS modules.

- /lib: Shared utilities, including Zod schemas and Prisma client.

- /api: Backend logic, Next.js API Routes, and database interactions.
