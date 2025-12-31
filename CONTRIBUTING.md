# Contributing to Multi-Format Engineering ETL Pipeline

Welcome to the Multi-Format Engineering ETL Pipeline project! We're excited to have you contribute. This document provides a comprehensive guide to understanding the project structure, our design system, and the workflow for contributing code.

## 1. Project Overview

Multi-Format Engineering ETL Pipeline is a modern, high-performance web application designed to visualize complex engineering ETL pipelines. It leverages a "Glass Morphism + Neon Aesthetic" to provide a premium, futuristic user experience.

### Tech Stack
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Variables + Utility Classes)
- **Icons**: Phosphor Icons (Duotone)
- **Charts**: Recharts

## 2. Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-org/multi-format-engineering-etl-pipeline.git
    cd multi-format-engineering-etl-pipeline
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 3. Project Architecture

We follow a feature-based architecture inspired by [Bulletproof React](https://github.com/alan2207/bulletproof-react). This structure helps us scale by keeping related code together.

### Directory Structure

```
src/
├── components/        # Shared components used across the entire application
│   ├── ui/           # Generic UI components (Buttons, Inputs, Cards)
│   └── layout/       # Layout components (Sidebar, Navbar)
├── features/          # Feature-based modules
│   ├── dashboard/    # Dashboard feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts  # Public API for the feature
│   └── pipeline/     # Pipeline visualization feature
├── hooks/             # Shared hooks used across multiple features
├── lib/               # Re-exporting library pre-configurations (axios, etc.)
├── types/             # Shared TypeScript types
├── utils/             # Shared utility functions
├── styles/            # Global styles and design tokens
│   ├── variables.css # CSS variables (colors, spacing, typography)
│   ├── utilities.css # Utility classes
│   └── base.css      # Reset and base styles
└── App.tsx            # Main application component
```

### Key Principles
- **Colocation**: Keep things as close as possible to where they are used. If a component is only used in the `dashboard` feature, it belongs in `features/dashboard/components`.
- **Public API**: Features should expose their public API via `index.ts`. Other features should import from `features/feature-name` instead of reaching into internal files.
- **Shared Components**: Only components that are truly generic and used in multiple features should go in `src/components`.

## 4. Design System & Styling

We use a strict design system defined in `STYLES.md`. Please read it carefully before making UI changes.

### Core Aesthetic
- **Theme**: Dark mode only.
- **Style**: Glass Morphism with Neon Accents.
- **Colors**:
    - Primary: Cyan (`#00d6cb`)
    - Background: Dark (`#121213`)
    - Text: White (`#ffffff`)

### Styling Guidelines
1.  **CSS Variables**: ALWAYS use CSS variables for colors, spacing, fonts, and border-radius.
    - ✅ `color: var(--color-primary);`
    - ❌ `color: #00d6cb;`
2.  **Utility Classes**: Use the utility classes defined in `src/styles/utilities.css` for common patterns like glass cards, neon buttons, and text gradients.
3.  **Icons**: Use **Phosphor Icons Duotone** variant.
    - Import from `react-icons/pi`.
    - Example: `import { PiRobotDuotone } from 'react-icons/pi';`

### Component Pattern Example
```tsx
import { PiRobotDuotone } from 'react-icons/pi';
import './MyComponent.css'; // Minimal custom styles if needed

export const MyComponent = () => {
  return (
    <div className="glass-card">
      <div className="flex items-center gap-4">
        <PiRobotDuotone size={32} className="text-primary" />
        <h3 className="text-xl font-bold">Feature Title</h3>
      </div>
      <p className="text-secondary mt-2">
        Description using design system variables.
      </p>
    </div>
  );
};
```

## 5. Development Workflow

### Branching Strategy
- **main**: Production-ready code.
- **feature/feature-name**: For new features.
- **fix/bug-name**: For bug fixes.

### Pull Request Process
1.  Create a new branch from `main`.
2.  Implement your changes following the architecture and style guides.
3.  Ensure code is formatted and linted.
4.  Open a Pull Request (PR) with a clear description of changes.
5.  Attach screenshots for UI changes.

### Code Style
- **Functional Components**: Use React functional components with hooks.
- **TypeScript**: Use strict typing. Avoid `any`.
- **Naming**:
    - Components: PascalCase (`MyComponent.tsx`)
    - Functions/Variables: camelCase (`myFunction`)
    - Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)

---

**Happy Coding!** 🚀
