# === Stage 1: Build the TypeScript backend ===
FROM node:20-slim AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Compile TypeScript into JS
RUN npm run build

# === Stage 2: Run optimized server ===
FROM node:20-slim

WORKDIR /app

# Copy production files only
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm ci --omit=dev

# Optionally: copy your serviceAccountKey if needed at runtime
# COPY serviceAccountKey.json ./serviceAccountKey.json

# Set environment variables if needed (or use a .env file mounted by Docker/Kubernetes)
# ENV PORT=3000

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]