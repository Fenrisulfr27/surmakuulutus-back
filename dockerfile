FROM node:20.11.0-alpine

WORKDIR /app

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

CMD ["node", "dist/server.js"]