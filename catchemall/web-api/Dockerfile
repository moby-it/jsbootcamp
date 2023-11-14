FROM node:18.16.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 4000

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O - http://localhost:4000/health/liveness || exit 1

CMD exec npm run start

