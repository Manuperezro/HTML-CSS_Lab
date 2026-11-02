# ☕ Bristol Café Code Lab – Repair & Build a Website

> **Level 3 BTEC Computing — Unit 15: Website Development**  
> An interactive browser-based educational coding laboratory where students learn HTML & CSS by repairing the broken website for the fictional *Bristol Brew Café*.

---

## 🌟 Overview

Bristol Café Code Lab is a gamified web development learning environment. Students are presented with broken sections of a café website and must drag-and-drop or arrange the correct semantic HTML tags, CSS rules, attributes, and styling properties to repair the live page in real-time.

### ✨ Key Features
- **Live Preview Sandbox**: Changes reflect immediately in an embedded mock browser view.
- **Interactive Drag & Drop**: Visual code blocks powered by `@dnd-kit` for intuitive learning.
- **Audio Feedback & Celebrations**: Sound effects and confetti animations upon successfully fixing sections.
- **Level 3 BTEC Curriculum Aligned**: Covers semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`), CSS Box Model, Flexbox, responsive layouts, and accessibility.
- **Code Export**: Students can download their completed HTML/CSS code or export zip archives.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm`

### Installation

```bash
# Clone the repository
git clone https://github.com/Manuperezro/HTML-CSS_Lab.git

# Navigate to the project directory
cd HTML-CSS_Lab

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Building for Production

```bash
# Build the optimized production bundle
npm run build
```

The compiled files will be located in the `dist/` directory.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS + Modern Design Tokens
- **Interactive Libraries**:
  - `@dnd-kit/core` & `@dnd-kit/sortable` (drag and drop)
  - `canvas-confetti` (celebrations)
  - `lucide-react` (icons)
  - `jszip` (project export)
- **Linter**: Oxlint

---

## 📄 License

This project is licensed under the MIT License for educational use in City of Bristol College.
