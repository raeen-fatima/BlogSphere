# -------- STAGE 1: Build --------
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
RUN npm install

# Copy full project
COPY . .

# Build production
RUN npm run build

# -------- STAGE 2: Runtime --------
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy built app only
COPY --from=builder /app ./

# Remove dev dependencies (optional optimization)
RUN npm prune --production

# Switch to non-root
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]