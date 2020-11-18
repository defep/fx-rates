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
            useUnifiedTopology: true
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
                const rates = await db.collection('rates').aggregate([
                    { $sort: { createdAt: -1 } },
                    {
                        $group:
                        {
                            _id: '$pair',
                            fee: { $first: "$fee" },
                            rate: { $first: "$rate" },
                            createdAt: { $first: "$createdAt" }
                        }
                    },
                    { $sort: { createdAt: -1 }}
                ]).toArray();
                return rates;
            } catch (error) {
                console.log(error);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/rates',
        async handler(request, h) {

            let payload = request.payload;
            payload.createdAt = new Date();

            const result = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=USD,ARS,BRL&format=1`)
                .then(res => res.text())
                .then(text => { return JSON.parse(text) })

            const baseRate = payload.pair.substr(0, 3);
            const destRate = payload.pair.substr(3);

            if (baseRate !== "EUR") {
                const eur_symbol = result["rates"][baseRate];

                payload.rate = result["rates"][destRate] / eur_symbol

                if (destRate === "EUR") {
                    payload.rate = 1 / eur_symbol;
                }
            } else {
                payload.rate = result["rates"][destRate];
            }

            if (!payload.fee || payload.fee < 0) {
                payload.fee = 0;
            }

            const status = await request.mongo.db.collection('rates').insertOne(payload);
            return status;
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