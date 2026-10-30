# BUILDER:
FROM node:25-alpine AS builder
WORKDIR /app
  
# Install PNPM:
RUN npm install -g pnpm

# Install dependencies and build:
COPY package.json pnpm-workspace.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run inspector:build

# RUNNER:
FROM node:25-alpine AS runner
WORKDIR /app

# Copy only necessary files from the build stage:
COPY --from=builder /app/.eslint-config-inspector ./

# Install a static site runner:
RUN npm install -g serve

# Expose the provided port:
EXPOSE $PORT

# Run the server:
CMD serve . --listen tcp://0.0.0.0:$PORT