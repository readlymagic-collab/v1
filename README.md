# ReadlyMagic | The Science of Reading

ReadlyMagic is an advanced, magic-themed literacy platform designed to help students master reading through science-based techniques. It features a full-stack architecture with a Next.js frontend, a NestJS backend, and MongoDB storage.

## 🚀 Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js 20.x](https://nodejs.org/)
- [Yarn 1.x](https://classic.yarnpkg.com/en/docs/install) (for local development)

---

## 🐳 Running with Docker (Recommended)

The easiest way to start the entire stack (Frontend, Backend, and Database) is using Docker.

### Development Mode (with Hot-Reloading)
```powershell
.\manage.bat dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **MongoDB**: `mongodb://localhost:27017/readlymagic`

### Production Mode
```powershell
.\manage.bat prod
```

### Stop the Application
```powershell
docker compose -f infra/docker-compose.yml down
```

---

## 💻 Local Development (without Docker)

If you prefer to run the apps directly on your machine:

1.  **Install Dependencies** (from the root directory):
    ```powershell
    yarn install
    ```
2.  **Start Services**:
    ```powershell
    yarn dev
    ```
    *Note: Ensure you have a MongoDB instance running locally on port 27017.*

---

## 🏗 Project Structure

This project is a **Yarn Workspace** monorepo:

- `apps/client`: Next.js frontend application (Tailwind CSS v4).
- `apps/server`: NestJS backend application.
- `packages/config`: Shared configuration (ESLint, TS, etc.).
- `infra/`: Docker configurations and environment setups.

---

## 🛠 Troubleshooting

### Frontend Styling "Disrupted"
If the frontend looks like plain text without styling, ensure that the `postcss.config.mjs` file exists in `apps/client` and contains the `@tailwindcss/postcss` plugin. Refresh your browser after ensuring the container has started successfully.

### Module Not Found
If you encounter `MODULE_NOT_FOUND` errors, run `yarn install` in the root directory to ensure the workspace links are correctly established.

---

## 📜 Metadata
- **Node Version**: 20.19.5 (Defined in `.nvmrc`)
- **Package Manager**: Yarn 1.22.22
- **Main CSS Framework**: Tailwind CSS v4
