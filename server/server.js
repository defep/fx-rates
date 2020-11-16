'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/rates',
        handler: (request, h) => {
            return 'Rates list';
        }
    });

    server.route({
        method: 'POST',
        path: '/rates',
        handler: (request, h) => {
            return 'Rate insert';
        }
    });

    server.route({
        method: 'PUT',
        path: '/rates',
        handler: (request, h) => {
            return 'Rate update';
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