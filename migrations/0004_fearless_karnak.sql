CREATE TABLE "equipment_stops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"equipment_id" uuid NOT NULL,
	"stop_type" "stop_type" NOT NULL,
	"stop_description" text NOT NULL,
	"stop_date" date NOT NULL,
	"stop_time" text NOT NULL,
	"next_steps" text NOT NULL,
	"end_stop_date" date,
	"end_stop_time" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "equipment_stops_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "equipment_stops" ADD CONSTRAINT "equipment_stops_equipment_id_equipment_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "equipment" DROP COLUMN "stop_type";--> statement-breakpoint
ALTER TABLE "equipment" DROP COLUMN "stop_description";--> statement-breakpoint
ALTER TABLE "equipment" DROP COLUMN "stop_date";--> statement-breakpoint
ALTER TABLE "equipment" DROP COLUMN "stop_time";--> statement-breakpoint
ALTER TABLE "equipment" DROP COLUMN "next_steps";