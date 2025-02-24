import fastify from 'fastify';
import { z } from 'zod';
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
//https://github.com/turkerdev/fastify-type-provider-zod


const app = fastify({logger: true});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(import('@fastify/swagger'),{transform:jsonSchemaTransform})
app.register(import('@fastify/swagger-ui'),{ routePrefix: '/documentation'})
app.register(import('@fastify/websocket'));
app.register(import('./routes/blog-route'));
app.register(import('./routes/websocket-route'));
async function run() {
  app.listen({port:3000}, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  })
}

run()
