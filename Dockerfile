FROM node:18-slim as builder

WORKDIR /src

COPY package.json yarn.lock ./
COPY packages/server/package.json packages/server/package.json
COPY packages/client/package.json packages/client/package.json

RUN yarn install --frozen-lockfile

COPY packages packages

WORKDIR /src/packages/server

RUN yarn build

WORKDIR /src/packages/client

RUN yarn build && rm -rf .next/cache

WORKDIR /src

RUN yarn install --frozen-lockfile --production

FROM node:18-slim as runtime

WORKDIR /src

COPY --from=builder /src/packages/server/build packages/server/build
COPY --from=builder /src/packages/server/fonts packages/server/fonts
COPY --from=builder /src/packages/client/.next packages/client/.next
COPY --from=builder /src/packages/client/public packages/client/public
COPY --from=builder /src/node_modules node_modules

CMD ["node", "packages/server/build/index.js"]
