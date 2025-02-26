import { z } from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import {signup,signin} from '../controllers/user';
const plugin: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: 'POST',
    url: '/signup',   
    schema: {
      tags: ['user'],
      body: z.object({
        nome: z.string().min(4),
        email: z.string().email(),
        senha: z.string().min(6),
      }),      
    },
    handler: signup,
  });
  fastify.route({
    method: 'POST',
    url: '/signin',
    schema: {
      tags: ['user'],
      body: z.object({
        email: z.string().email(),
        senha: z.string().min(6),
      }),      
    },
    handler: signin,
  });
};


export default plugin