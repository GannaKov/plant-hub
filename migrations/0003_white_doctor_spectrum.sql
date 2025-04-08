CREATE TYPE "public"."stop_type" AS ENUM('planned-stop', 'service-stop', 'readjustment-stop', 'failure-stop');--> statement-breakpoint
-- ALTER TABLE "equipment" ALTER COLUMN "stop_type" SET DATA TYPE stop_type;

ALTER TABLE "equipment" ALTER COLUMN "stop_type" SET DATA TYPE stop_type USING stop_type::stop_type;
