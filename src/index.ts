import fastify from 'fastify';
import { z } from 'zod';
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { component } from 'vue/types/umd';
//https://github.com/turkerdev/fastify-type-provider-zod


const app = fastify({logger: true});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(import('@fastify/swagger'),{transform:jsonSchemaTransform,openapi:{ security: [{ bearerAuth: [] }],components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat:'JWT' } } }}});
app.register(import('@fastify/swagger-ui'),{ routePrefix: '/documentation'})
app.register(import('@fastify/websocket'));
app.register(import('./routes/user-route'));
app.register(import('./routes/room-route'));
app.register(import('./routes/websocket-route'));
async function run() { 
  app.listen({port:Number(process.env.PORT)}, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  })
}

run()
