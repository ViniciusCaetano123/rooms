import {FastifyPluginAsync} from 'fastify'

const websocketPlugin: FastifyPluginAsync = async function (fastify, _opts) {
    fastify.get('/socket', { websocket: true }, (socket, req) => {
        socket.on('message', (msg) => {
            console.log(msg)
            socket.send('msg');
        });
    });
}


export default websocketPlugin