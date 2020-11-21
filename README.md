# Fx-Rates
A currency converter tool that uses a [ReactJS](https://reactjs.org) frontend, an api written in [hapi](https://hapi.dev), and [MongoDB](https://www.mongodb.com/) to store the currency rates and fees.

## Screenshot

![fx-rates](https://user-images.githubusercontent.com/3970915/99618698-969a6700-2a00-11eb-96b4-d04c3ab76ec8.png)

## Install

Clone this repo

`git clone https://github.com/defep/fx-rates`

Install the required dependencies for the client and server applications.

```
cd fx-rates
npm i --prefix server && npm i --prefix client
```

## Server setup

Inside the server folder create an .env file and add your Fixer API key. You can create it from .env.example.

```
cd server
cp .env.example .env
vi .env
```

## Run Server

```
cd server
npm start
```

## Run ReactJS

Change directory to client folder and modify the package.json proxy value from api to localhost.

`"proxy": "http://localhost:3001"`

Start the ReactJS app.

```
npm start
```

## Docker

Alternatively you could use docker-compose to run this application.

`docker-compose up --build`