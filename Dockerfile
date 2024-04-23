
# BUILDER:
FROM node:20-alpine AS builder
WORKDIR /app
  
# Enable PNPM:
RUN corepack enable

# Install dependencies and build NextJS:
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run inspector:build

# RUNNER:
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only necessary files from the build stage:
COPY --from=builder /app/.eslint-config-inspector ./

# Enable PNPM and install a static site runner:
RUN corepack enable
RUN pnpm install -g serve

# Run the server:
CMD serve .