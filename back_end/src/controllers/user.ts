import bcrypt from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../db/db-postgres";
import { usuarios } from "../db/schema/usuarios";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
interface SignupBody {
  nome: string;
  email: string;
  senha: string;
}
interface SinginBody {
  email: string;
  senha: string;
}

const signup = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { nome, email, senha } = req.body as SignupBody;

    if (!nome || !email || !senha) {
      return reply.status(400).send({ error: "Todos os campos são obrigatórios." });
    }

    const userExists = await db.select().from(usuarios).where(eq(usuarios.email, email));
    if (userExists.length > 0) {
      return reply.status(400).send({ error: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 12);

    await db.insert(usuarios).values({ nome, email, senha: hashedPassword });

    return reply.status(201).send({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    return reply.status(500).send({ error: "Erro interno do servidor" });
  }
}

const signin = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, senha } = req.body as SinginBody;

    if (!email || !senha) {
      return reply.status(400).send({ error: "Todos os campos são obrigatórios." });
    }

    const result  = await db.select().from(usuarios).where(eq(usuarios.email, email));
    const [user] = result; 
    if (result.length === 0) {
      return reply.status(400).send({ error: "E-mail/Senha incorreta." });
    }
    
    const isPasswordCorrect = await bcrypt.compare(senha, user.senha);
  
    if (!isPasswordCorrect) {
      return reply.status(400).send({ error: "E-mail/Senha incorreta" });
    }
    console.log(user,new Date())
    await db.update(usuarios).set({data_ultimo_login: new Date()}).where(eq(usuarios.id, user.id));
    const payload = {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1d' });
    return reply.status(200).send({token,...payload});
  } catch (error) {

    return reply.status(500).send({ error: "Erro interno do servidor" });
  }
}



export { signup, signin };
