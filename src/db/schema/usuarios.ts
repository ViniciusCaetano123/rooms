import { pgTable, uuid, text, timestamp} from "drizzle-orm/pg-core";

export const usuarios = pgTable("usuarios", {
    id: uuid().primaryKey().defaultRandom(),
    nome: text().notNull(),
    email: text().notNull().unique(),
    senha: text().notNull(),
    data_criacao: timestamp("data_criacao").defaultNow(),
    data_ultimo_login: timestamp("data_ultimo_login"),
});