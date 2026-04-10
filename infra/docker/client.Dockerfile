# Stage 1: Base/Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json yarn.lock ./
COPY apps/client/package.json apps/client/yarn.lock ./apps/client/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy client source
COPY apps/client/ ./apps/client/

# Build client
WORKDIR /app/apps/client
RUN yarn build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app/apps/client

# Copy built files
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/client/.next ./.next
COPY --from=builder /app/apps/client/public ./public
COPY --from=builder /app/apps/client/package.json ./

EXPOSE 3000

CMD ["yarn", "start"]
