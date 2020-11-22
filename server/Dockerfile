FROM node:14.15.1-alpine

WORKDIR /usr/src/api

COPY . .

EXPOSE 3001

RUN npm install --production --silent && npm install -g nodemon

CMD ["npm", "start"]