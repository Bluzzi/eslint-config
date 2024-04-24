
# BUILDER:
FROM node:20-alpine AS builder
WORKDIR /app
  
# Enable PNPM:
RUN corepack enable

# Install dependencies and build:
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run inspector:build

# RUNNER:
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only necessary files from the build stage:
COPY --from=builder /app/.eslint-config-inspector ./

# Install a static site runner:
RUN npm install -g serve

# Expose the provided port:
EXPOSE $PORT

# Run the server:
CMD serve . --listen tcp://0.0.0.0:$PORT