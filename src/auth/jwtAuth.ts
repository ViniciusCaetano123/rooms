import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../interface/user.interface";
import jwt from "jsonwebtoken";

const jwtAuth = async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token?.replace("Bearer ", "");
    if (!token) {
        return reply.status(401).send({ error: "Token não informado" });
    }
    try {
        const decoded = jwt.verify(tokenWithoutBearer!, process.env.JWT_SECRET!);
        req.user = decoded as User;
    } catch (error) {
        return reply.status(401).send({ error: "Token inválido" });
    }
}
export { jwtAuth };