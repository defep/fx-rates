FROM node:14.15.1-alpine

COPY package.json package-lock.json ./
RUN npm install --production --silent && mkdir /client && mv ./node_modules ./client

WORKDIR /client

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
