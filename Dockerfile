# BUILDER:
FROM node:25-alpine AS builder
WORKDIR /app
  
# Install PNPM:
RUN npm install -g pnpm

# Install dependencies and build:
COPY package.json pnpm-workspace.yaml ./
RUN pnpm install
COPY . .

# Install the packages gating the dynamic configs (react, nextjs, jsx-a11y, tanstack-query).
# They are deliberately NOT devDependencies of the repo: only this build needs them,
# so that isPackageExists() enables every config in the deployed inspector.
# Their exact versions don't matter, the rule sets come from the plugins bundled in the config itself.
# --ignore-scripts skips next's optional "sharp" build script, which is not approved by
# the repository supply-chain policy and would otherwise fail the build.
RUN pnpm add -D --ignore-scripts react@^19.0.0 next@^16.4.3 @tanstack/react-query@^5.0.0

RUN pnpm run inspector:build

# RUNNER:
FROM node:25-alpine AS runner
WORKDIR /app

# Copy only necessary files from the build stage:
COPY --from=builder /app/dist/__eslint-config-inspector ./

# Install a static site runner:
RUN npm install -g serve

# Expose the provided port:
EXPOSE $PORT

# Run the server:
CMD serve . --listen tcp://0.0.0.0:$PORT