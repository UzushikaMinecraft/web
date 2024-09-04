FROM node:20-slim as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PORT=3100
RUN corepack enable

ENV NODE_ENV production

WORKDIR /web

COPY . .
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
RUN pnpm run build

CMD ["node", "/web/build/server"]