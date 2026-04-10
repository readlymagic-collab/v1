# Stage 1: Base/Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json yarn.lock ./
COPY apps/server/package.json apps/server/yarn.lock ./apps/server/

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy server source
COPY apps/server/ ./apps/server/

# Build server
WORKDIR /app/apps/server
RUN yarn build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Copy built files and production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./

EXPOSE 3001

CMD ["node", "dist/server.js"]
