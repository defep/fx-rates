'use strict';

require('dotenv').config()
const fetch = require("node-fetch");
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    const dbOpts = {
        url: 'mongodb://localhost:27017/challengedb',
        settings: {
            useUnifiedTopology: true,
            poolSize: 10
        },
        decorate: true
    };

    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbOpts
    });

    server.route({
        method: 'GET',
        path: '/api/rates',
        async handler(request, h) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            try {
                const rates = await db.collection('rates').find({}).toArray();
                return rates;
            } catch (error) {
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/rates',
        async handler(request, h) {

            let payload = request.payload;

            const result = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=USD,ARS,BRL&format=1`)
                .then(res => res.text())
                .then(text => { return JSON.parse(text) })

            const base_rate = payload.pair.substr(0, 3);
            const dest_rate = payload.pair.substr(3);

            if (base_rate !== "EUR") {
                const eur_symbol = result["rates"][base_rate];

                payload.rate = result["rates"][dest_rate] / eur_symbol

                if (dest_rate === "EUR") {
                    payload.rate = 1 / eur_symbol;
                }
            } else {
                rate.rate = result["rates"][dest_rate];
            }

            const status = await request.mongo.db.collection('rates').insertOne(payload);
            return status;
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/rates/{id}',
        handler: (request, h) => {
            const id = request.params.id

            return `Rate update ${id}`;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);


};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();