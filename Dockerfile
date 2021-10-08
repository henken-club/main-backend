# whole dependencies
FROM node:16.9.1-slim AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
  libssl-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

COPY schema.prisma ./
RUN yarn run generate

# production only dependencies
FROM node:16.9.1-slim AS deps-production
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

# builder
FROM deps AS builder
WORKDIR /app

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN yarn run build

# runner
FROM node:16.9.1-slim AS runner
WORKDIR /app

ENV PORT 4000

COPY --from=deps-production /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
