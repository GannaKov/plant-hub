CREATE TABLE "equipment" (
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
	CONSTRAINT "equipment_id_unique" UNIQUE("id"),
	CONSTRAINT "equipment_inventory_number_unique" UNIQUE("inventory_number")
);
--> statement-breakpoint
DROP TABLE "books" CASCADE;