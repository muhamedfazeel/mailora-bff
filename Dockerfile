# Base image as ARG
ARG NODE_VERSION=22.15.0-alpine
FROM node:${NODE_VERSION} AS base

# Set work directory
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM base AS production

# Set environment
ENV NODE_ENV=production
ENV PORT=3500

# Workdir & app files
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install production-only dependencies
RUN npm ci --omit=dev && \
    addgroup -S mailora && adduser -S mailorauser -G mailora && \
    chown -R mailorauser:mailora /app

USER mailorauser

# Expose port
EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]