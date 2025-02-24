import { z } from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

const plugin: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    // Define your schema
    schema: {
      querystring: z.object({
        name: z.string().min(4),
      }),
      response: {
        200: z.string(),
      },
    },
    handler: (req, res) => {
      res.send(req.query.name);
    },
  });
};


export default plugin