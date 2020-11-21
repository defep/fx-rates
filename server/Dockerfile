FROM node:14.15.1-alpine

COPY package.json package-lock.json ./
RUN npm install --production --silent && mkdir -p /usr/src/api && mv ./node_modules ./usr/src/api

WORKDIR /usr/src/api
COPY . .

EXPOSE 3001

CMD ["npm", "start"]

