CREATE TABLE "salas_convidados" (
	"id" serial PRIMARY KEY NOT NULL,
	"sala_id" uuid NOT NULL,
	"convidado_id_usuario" uuid NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "salas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"mensagens" jsonb DEFAULT '[]'::jsonb,
	"id_usuario" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"senha" text NOT NULL,
	"data_criacao" timestamp DEFAULT now(),
	"data_ultimo_login" timestamp,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "salas_convidados" ADD CONSTRAINT "salas_convidados_sala_id_salas_id_fk" FOREIGN KEY ("sala_id") REFERENCES "public"."salas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salas_convidados" ADD CONSTRAINT "salas_convidados_convidado_id_usuario_usuarios_id_fk" FOREIGN KEY ("convidado_id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salas" ADD CONSTRAINT "salas_id_usuario_usuarios_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;