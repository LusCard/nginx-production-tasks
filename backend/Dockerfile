
FROM node:22-alpine AS builder

# Install build dependencies
RUN apk add --no-cache wget python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install ALL dependencies (including devDependencies)
RUN npm ci

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Production image
FROM node:22-alpine AS runner

RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "dist/server.js"]
