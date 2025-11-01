# 📝 TO-DO List App

A modern, responsive todo list application built with Next.js 16, featuring a sleek dark theme with yellow accents and smooth animations.

![Todo App Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library

### State Management

- **Zustand** - Lightweight state management
- **Zod** - TypeScript-first schema validation

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality assurance
- **lint-staged** - Pre-commit linting

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/tolik4813/toDO__list__V2.git
   cd toDO__list__V2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking

# Git Hooks
npm run prepare      # Setup Husky git hooks
```

## 🏗️ Project Structure

```
app/
├── customComponents/     # React components
│   ├── InputTasks.tsx   # Task input form
│   ├── TodoItem.tsx     # Individual todo item
│   ├── TasksList.tsx    # List of todos
│   └── ToDoContainer.tsx # Main container
├── hooks/               # Custom React hooks
│   └── useTodoForm.ts   # Form logic and validation
├── lib/                 # Utilities and constants
│   ├── constants.ts     # App constants and CSS classes
│   └── validation.ts    # Zod schemas
├── store/               # State management
│   └── todoStore.ts     # Zustand store
├── types/               # TypeScript type definitions
│   └── todo.ts          # Todo interface
└── globals.css          # Global styles
```

## 🎨 Design System

### Colors

- **Background**: Black (`#000000`)
- **Primary**: Yellow (`#EAB308`)
- **Text**: White (`#FFFFFF`)
- **Secondary**: Gray (`#374151`)

### Typography

- **Primary Font**: Bitcount Grid Single
- **Fallback**: JetBrains Mono, Fira Code, Consolas

### Animations

- **Duration**: 200ms
- **Easing**: ease-in-out
- **Effects**: Scale, fade, slide transitions

## 🔧 Configuration

### Environment Variables

No environment variables required for basic functionality.

### Customization

- Modify `app/lib/constants.ts` for styling and text changes
- Update `app/lib/validation.ts` for validation rules
- Customize colors in `app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Made with ❤️ by [Anatolii Lehotin](https://github.com/tolik4813)
