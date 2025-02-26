import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../db/db-postgres";
import { salas,salaConvidados } from "../db/schema/salas";
import { usuarios } from "../db/schema/usuarios";
import {User} from "../interface/user.interface";
import { eq } from "drizzle-orm";

interface RoomBody {
    nome: string;
}
interface RoomInviteBody {
    idSala: string;
    emailConvidado: string;
}
const create = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { nome } = req.body as RoomBody;
        const user = req.user as User;
        if (!nome) {
            return reply.status(400).send({ error: "Nome da sala é obrigatório" });
        }
        const room = await db.insert(salas).values({ nome, "idUsuario": user.id || '' }).returning();
        
        return reply.status(201).send({ message: "Sala cadastrada com sucesso", "idSala":room[0].id }); 
    } catch (error) {
        return reply.status(500).send({ error: "Erro interno do servidor" });
    }
}
const rooms = async (req: FastifyRequest, reply: FastifyReply) => {
    try {       
        const user = req.user as User;
        
        const roomsIdUsuario = await db.select().from(salas).where(eq(salas.idUsuario,user.id));
   
        return reply.status(201).send({"dados":roomsIdUsuario }); 
    } catch (error) {
        console.log(error)
        return reply.status(500).send({ error: "Erro interno do servidor" });
    }
}
const invite = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { idSala, emailConvidado } = req.body as RoomInviteBody;
     
        const user = req.user as User;
        if(user.email == emailConvidado){
            return reply.status(400).send({ error: "Você não pode convidar para você mesmo" });
        }
        const resultUsuarioConvidado = await db.select({id:usuarios.id,email:usuarios.email}).from(usuarios).where(eq(usuarios.email,emailConvidado));

        if(resultUsuarioConvidado.length === 0){
            return reply.status(400).send({ error: "Usuário não encontrado" });
        }

        const [usuarioConvidado] = resultUsuarioConvidado;  
   
        const salaConvidado = await db.insert(salaConvidados).values({ salaId: idSala, convidadoIdUsuario: usuarioConvidado.id,status:"pendente" }).returning();
    
        return reply.status(200).send({ salaConvidado });
    } catch (error) {   
        return reply.status(500).send({ error: "Erro interno do servidor" });
    }
}


export { create, invite, rooms };
