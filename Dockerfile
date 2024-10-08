FROM node:20-alpine3.18 AS base

ENV DIR /app
WORKDIR $DIR

FROM base AS dev

ENV NODE_ENV=development

COPY package*.json .

RUN npm i

COPY tsconfig*.json .
COPY .swcrc .
COPY nest-cli.json .
COPY src src
COPY prisma prisma

EXPOSE $PORT

CMD ["sh", "-c", "npm run migrate:dev && npm run start:dev"]

FROM base AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r2

COPY package*.json .

RUN npm ci

COPY tsconfig*.json .
COPY .swcrc .
COPY nest-cli.json .
COPY src src
COPY prisma prisma

RUN npx prisma generate && \
    npm run build && \
    npm prune --production

FROM base AS production

ENV NODE_ENV=production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/package*.json .
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist
COPY --from=build $DIR/prisma prisma


EXPOSE $PORT
CMD ["npm", "run", "start:migrate:prod"]
