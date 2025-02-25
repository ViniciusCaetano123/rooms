import { FastifyRequest } from "fastify";
import { User } from "../interface/user.interface";
declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}