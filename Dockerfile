FROM node:16-alpine AS jon

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:16-alpine AS bob
WORKDIR /app
COPY . .
COPY --from=jon /app/node_modules ./node_modules
RUN npm run build

FROM node:16-alpine AS ann
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S pop
RUN adduser -S lol -u 1001
USER lol

COPY --from=bob --chown=lol:pop /app/package.json ./package.json
COPY --from=bob --chown=lol:pop /app/node_modules ./node_modules
COPY --from=bob --chown=lol:pop /app/dist ./dist
COPY --chown=lol:pop .env ./.env

EXPOSE 3000

CMD ["npm", "start"]