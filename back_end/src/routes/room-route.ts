import { z } from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { jwtAuth } from '../auth/jwtAuth';
import {create,invite} from '../controllers/room';
const plugin: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: 'POST',
    url: '/room',   
    schema: {
      tags: ['room'],
      body: z.object({
        nome: z.string().min(4)
      }),      
    },
    preHandler: jwtAuth,
    handler: create,
  });
  fastify.route({
    method: 'POST',
    url: '/room/invite',   
    schema: {
      tags: ['room'],
      body: z.object({
        idSala: z.string().min(4),
        emailConvidado: z.string().email()
      }),      
    },
    preHandler: jwtAuth,
    handler: invite,
  });
 
};


export default plugin