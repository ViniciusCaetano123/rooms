import {FastifyPluginAsync} from 'fastify'

const websocketPlugin: FastifyPluginAsync = async function (fastify, _opts) {
    fastify.get('/socket', { websocket: true }, (socket, req) => {
        socket.on('message', (msg) => {
            console.log(msg.toString())
            socket.send('ms g texte bla');
        });
    });
}


export default websocketPlugin