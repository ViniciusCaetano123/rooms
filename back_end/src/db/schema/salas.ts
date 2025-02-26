import { pgTable, serial, text, timestamp,uuid,jsonb } from "drizzle-orm/pg-core";
import { usuarios } from "./usuarios"; 

export const salas = pgTable("salas", {
    id: uuid("id").primaryKey().defaultRandom(),
    nome: text("nome").notNull(),
    mensagens: jsonb("mensagens").default([]), 
    idUsuario: uuid("id_usuario").notNull().references(() => usuarios.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
});

export  const salaConvidados = pgTable("salas_convidados", {
    id: serial("id").primaryKey(),
    salaId: uuid("sala_id").notNull().references(() => salas.id, { onDelete: "cascade" }),
    convidadoIdUsuario: uuid("convidado_id_usuario").notNull().references(() => usuarios.id, { onDelete: "cascade" }),
    status: text("status").default("pending"), // 'pending', 'accepted', 'declined'
    createdAt: timestamp("created_at").defaultNow(),
});

