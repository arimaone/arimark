# Contributing to Arimark

Thank you for your interest in contributing to **Arimark**! We welcome bug reports, feature suggestions, documentation improvements, and code contributions from the community.

---

## 🛠️ Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm** or **pnpm**

### 2. Fork and Clone
```bash
git clone https://github.com/<your-username>/arimark.git
cd arimark
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Interactive Playground
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the split-screen live editor, format toggles, and state inspector.

---

## 🧪 Testing & Building

Before submitting a pull request, ensure tests and builds pass:

```bash
# Run the automated Vitest test suite
npm test

# Build the library bundle
npm run build
```

---

## 📝 Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation improvements
- `style:` Code style, formatting, or CSS adjustments
- `refactor:` Code changes that neither fix a bug nor add a feature
- `test:` Adding or updating tests
- `chore:` Build scripts, package dependencies, or tool configurations

---

## 🚀 Submitting a Pull Request

1. Create a feature branch: `git checkout -b feat/my-new-feature`
2. Commit your changes with descriptive commit messages.
3. Push to your fork: `git push -u origin feat/my-new-feature`
4. Open a Pull Request on GitHub against `main`.
5. Clearly describe the motivation, changes made, and how you tested them.
