FROM node:14.15.1-alpine

WORKDIR /usr/src/client

COPY . .

RUN npm i --silent

EXPOSE 3000

CMD ["npm", "start"]
