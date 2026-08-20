import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1787217093274 implements MigrationInterface {
    name = 'Educenter1787217093274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher_payroll_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lesson_session_id" uuid NOT NULL, "teacher_id" uuid NOT NULL, "group_id" uuid NOT NULL, "amount" numeric(12,2) NOT NULL, "date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d670e33bc2b9d6aef1c8b683c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ef62398f4e15e31ec78166596f" ON "teacher_payroll_entries" ("lesson_session_id") `);
        await queryRunner.query(`CREATE TABLE "monthly_payroll_summaries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "teacher_id" uuid NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "total_lessons_planned" integer NOT NULL DEFAULT '0', "total_lessons_conducted" integer NOT NULL DEFAULT '0', "total_amount" numeric(12,2) NOT NULL DEFAULT '0', "is_locked" boolean NOT NULL DEFAULT false, "locked_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5f20c93dab779f0cbc778f19abc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fa12c314a69dad11845740ccd6" ON "monthly_payroll_summaries" ("teacher_id", "year", "month") `);
        await queryRunner.query(`CREATE TABLE "teacher_payroll_corrections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "monthly_payroll_summary_id" uuid NOT NULL, "amount" numeric(12,2) NOT NULL, "reason" character varying NOT NULL, "created_by" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e92a88ae3689fd66f28d4f9ba06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."staff_attendance_status_enum" AS ENUM('ON_TIME', 'LATE', 'ABSENT')`);
        await queryRunner.query(`CREATE TABLE "staff_attendance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "check_in" TIMESTAMP WITH TIME ZONE, "check_out" TIMESTAMP WITH TIME ZONE, "status" "public"."staff_attendance_status_enum", "date" date NOT NULL, "note" character varying, CONSTRAINT "PK_b76740885e2e06ab5e81ccd7781" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."lesson_sessions_status_enum" AS ENUM('PLANNED', 'CONDUCTED', 'NOT_CONDUCTED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "lesson_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group_id" uuid NOT NULL, "date" date NOT NULL, "planned_start_time" TIME NOT NULL, "planned_end_time" TIME NOT NULL, "assigned_teacher_id" uuid NOT NULL, "actual_teacher_id" uuid, "status" "public"."lesson_sessions_status_enum" NOT NULL DEFAULT 'PLANNED', "attendance_marked_at" TIMESTAMP WITH TIME ZONE, "is_substitution" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_07c712bd1808a8a198d9ff2ef38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c883b5678aec93f95f34ff3e14" ON "lesson_sessions" ("group_id", "date") `);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "floor" integer`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "lesson_session_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "lesson_session_id"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "floor"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c883b5678aec93f95f34ff3e14"`);
        await queryRunner.query(`DROP TABLE "lesson_sessions"`);
        await queryRunner.query(`DROP TYPE "public"."lesson_sessions_status_enum"`);
        await queryRunner.query(`DROP TABLE "staff_attendance"`);
        await queryRunner.query(`DROP TYPE "public"."staff_attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "teacher_payroll_corrections"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa12c314a69dad11845740ccd6"`);
        await queryRunner.query(`DROP TABLE "monthly_payroll_summaries"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef62398f4e15e31ec78166596f"`);
        await queryRunner.query(`DROP TABLE "teacher_payroll_entries"`);
    }

}
