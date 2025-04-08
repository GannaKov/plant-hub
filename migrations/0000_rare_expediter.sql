CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inventory_number" varchar(255) NOT NULL,
	"equipment_type" varchar(255) NOT NULL,
	"equipment_name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"stop_type" varchar(255) NOT NULL,
	"stop_description" text NOT NULL,
	"stop_date" date NOT NULL,
	"stop_time" text NOT NULL,
	"next_steps" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "books_id_unique" UNIQUE("id"),
	CONSTRAINT "books_inventory_number_unique" UNIQUE("inventory_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"login" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'USER',
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_login_unique" UNIQUE("login")
);
