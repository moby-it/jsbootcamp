FROM node:18.16.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 4000

CMD exec npm run start

