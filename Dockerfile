# Stage 1: Builder
FROM node:18.18-alpine AS builder

# Set the working directory in the builder stage
WORKDIR /app

# Copy the rest of your application source code to the builder stage
COPY . .

RUN yarn install --frozen-lockfile

# Set NODE_ENV to 'production'
ENV NODE_ENV production

# Build the TypeScript application in the builder stage

RUN yarn build

# Stage 3: Runner
FROM node:18.18-alpine AS runner

# Set the working directory in the runner stage
WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./

COPY --from=builder /app/node_modules ./node_modules

# # Copy the TypeScript build from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port your application will run on (if applicable)
EXPOSE 3000/tcp

# Define the command to run your application in the runner stage
CMD ["node", "dist/index.js"]