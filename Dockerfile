FROM node:16.4.2-slim AS node-for-prisma
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
  libssl-dev=1.1.1d-0+deb10u7 \
  curl=7.64.0-4+deb10u2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# whole dependencies
FROM node-for-prisma AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

COPY ./schema.prisma ./
RUN yarn run generate

# production only dependencies
FROM deps AS deps-production
WORKDIR /app

RUN npm prune --production

# builder
FROM deps AS builder
WORKDIR /app

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN yarn run build

# runner
FROM node-for-prisma AS runner
WORKDIR /app

ENV PORT 8000

COPY --from=deps-production /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
