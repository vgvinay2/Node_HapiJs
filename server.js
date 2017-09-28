'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

//Above code will behave like calling API as a GET method
// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
//        reply('Hello, world!');
//        // reply.file('./public/hello.html');
//     }
// });

// INERT USED TO SERVE STATIC FILE FOR NODE 
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

var obj = {
    "user1":"arun", 
    "user2":"karan",
    "user3":"kumar",
    "user4":"naresh"
};

// to handle GET request
server.route({
    method: 'GET',
    path:'/users', 
    handler: function (request, reply) {

        return reply(obj);
    }
});