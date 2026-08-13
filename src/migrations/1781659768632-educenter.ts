import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1781659768632 implements MigrationInterface {
    name = 'Educenter1781659768632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher_salaries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "teacher_id" character varying NOT NULL, "base_amount" numeric(12,2) NOT NULL, "bonus" numeric(12,2) NOT NULL DEFAULT '0', "fine" numeric(12,2) NOT NULL DEFAULT '0', "total_paid" numeric(12,2) NOT NULL DEFAULT '0', "period_start" date NOT NULL, "period_end" date NOT NULL, "is_paid" boolean NOT NULL DEFAULT false, "paid_at" TIMESTAMP WITH TIME ZONE, "note" character varying, CONSTRAINT "PK_9c3bd59d986e1ee7a993506d17e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."teacher_attendance_status_enum" AS ENUM('ON_TIME', 'LATE', 'ABSENT')`);
        await queryRunner.query(`CREATE TABLE "teacher_attendance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "teacher_id" character varying NOT NULL, "check_in" TIMESTAMP WITH TIME ZONE, "check_out" TIMESTAMP WITH TIME ZONE, "status" "public"."teacher_attendance_status_enum", "date" date NOT NULL, "note" character varying, CONSTRAINT "PK_db5e32ed63fac67b9709ad3be1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "assigned_to" character varying, "created_by" character varying NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'TODO', "priority" "public"."tasks_priority_enum" NOT NULL DEFAULT 'MEDIUM', "deadline" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."app_settings_type_enum" AS ENUM('STRING', 'NUMBER', 'BOOLEAN', 'JSON')`);
        await queryRunner.query(`CREATE TABLE "app_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "value" text, "type" "public"."app_settings_type_enum" NOT NULL DEFAULT 'STRING', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_975c2db59c65c05fd9c6b63a2ab" UNIQUE ("key"), CONSTRAINT "PK_4800b266ba790931744b3e53a74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "holidays" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "branch_id" character varying, CONSTRAINT "PK_3646bdd4c3817d954d830881dfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sms_logs_status_enum" AS ENUM('DELIVERED', 'FAILED', 'PENDING')`);
        await queryRunner.query(`CREATE TABLE "sms_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying NOT NULL, "message" text NOT NULL, "provider_id" character varying, "status" "public"."sms_logs_status_enum", "sent_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_811e3a63f5e14a50475c6e8be3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."audit_logs_action_enum" AS ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT')`);
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying, "action" "public"."audit_logs_action_enum" NOT NULL, "table_name" character varying NOT NULL, "row_id" character varying, "old_values" jsonb, "new_values" jsonb, "ip_address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "branch_id" character varying NOT NULL, "name" character varying NOT NULL, "capacity" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group_id" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "time_limit_mins" integer, "is_published" boolean NOT NULL DEFAULT false, "start_at" TIMESTAMP WITH TIME ZONE, "end_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quiz_id" character varying NOT NULL, "question_text" text NOT NULL, "image_url" character varying, "points" numeric(5,2) NOT NULL DEFAULT '1', "sort_order" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_ec0447fd30d9f5c182e7653bfd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question_id" character varying NOT NULL, "option_text" text NOT NULL, "is_correct" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9c59607f100085ab17f0f138926" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_results" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quiz_id" character varying NOT NULL, "student_id" character varying NOT NULL, "score" numeric(5,2) NOT NULL DEFAULT '0', "max_score" numeric(5,2), "started_at" TIMESTAMP WITH TIME ZONE, "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_4ecf38c5bf5b054ccc9f10e438a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying, "full_name" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c94c3cea9b43a18c81269ded41d" UNIQUE ("user_id"), CONSTRAINT "PK_9a4dc67c7b8e6a9cb918938d353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_parents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" character varying NOT NULL, "parent_id" character varying NOT NULL, CONSTRAINT "PK_3f3fbf0307e277adf3e90495435" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lead_sources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_bc885a4409ec70ee5a810dbbd6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."leads_status_enum" AS ENUM('NEW', 'CONTACTED', 'TRIAL_LESSON', 'REGISTERED', 'CLOSED')`);
        await queryRunner.query(`CREATE TABLE "leads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "phone" character varying NOT NULL, "source_id" character varying, "status" "public"."leads_status_enum" NOT NULL DEFAULT 'NEW', "interest_subject_id" character varying, "assigned_admin_id" character varying, "branch_id" character varying, "notes" text, "trial_date" date, "converted_at" TIMESTAMP WITH TIME ZONE, "student_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."call_logs_result_enum" AS ENUM('ANSWERED', 'NO_ANSWER', 'BUSY', 'WRONG_NUMBER')`);
        await queryRunner.query(`CREATE TABLE "call_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lead_id" character varying NOT NULL, "admin_id" character varying NOT NULL, "notes" text, "result" "public"."call_logs_result_enum", "next_call_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa08476bcc13bfdf394261761e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "branch_id" character varying NOT NULL, "name" character varying NOT NULL, "sku" character varying, "description" text, "price" numeric(12,2) NOT NULL DEFAULT '0', "stock_quantity" integer NOT NULL DEFAULT '0', "min_stock_level" integer NOT NULL DEFAULT '5', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_395ec8d9e0cad6e3890b989fc1c" UNIQUE ("sku"), CONSTRAINT "PK_cf2f451407242e132547ac19169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."inventory_logs_type_enum" AS ENUM('IN', 'OUT', 'ADJUSTMENT')`);
        await queryRunner.query(`CREATE TABLE "inventory_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "item_id" character varying NOT NULL, "type" "public"."inventory_logs_type_enum" NOT NULL, "quantity" integer NOT NULL, "reason" character varying, "action_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_06b444680ab11eb7c7d0ed6eced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" character varying NOT NULL, "item_id" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "amount" numeric(12,2) NOT NULL, "sold_by" character varying, "sold_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0ae373f8a44b348481e8be9a422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."discounts_type_enum" AS ENUM('BROTHER_SISTER', 'FULL_PAYMENT', 'LOYALTY', 'PROMO')`);
        await queryRunner.query(`CREATE TABLE "discounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" character varying NOT NULL, "group_id" character varying, "type" "public"."discounts_type_enum" NOT NULL, "percentage" numeric(5,2) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "expired_at" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contracts_status_enum" AS ENUM('ACTIVE', 'EXPIRED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" character varying NOT NULL, "contract_number" character varying NOT NULL, "file_url" character varying, "signed_at" TIMESTAMP WITH TIME ZONE, "expires_at" date, "status" "public"."contracts_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_db84c172dc74e6271e614b68fbd" UNIQUE ("contract_number"), CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying, "phone" character varying, "manager_id" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "branches"`);
        await queryRunner.query(`DROP TABLE "contracts"`);
        await queryRunner.query(`DROP TYPE "public"."contracts_status_enum"`);
        await queryRunner.query(`DROP TABLE "discounts"`);
        await queryRunner.query(`DROP TYPE "public"."discounts_type_enum"`);
        await queryRunner.query(`DROP TABLE "book_sales"`);
        await queryRunner.query(`DROP TABLE "inventory_logs"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_logs_type_enum"`);
        await queryRunner.query(`DROP TABLE "inventory_items"`);
        await queryRunner.query(`DROP TABLE "call_logs"`);
        await queryRunner.query(`DROP TYPE "public"."call_logs_result_enum"`);
        await queryRunner.query(`DROP TABLE "leads"`);
        await queryRunner.query(`DROP TYPE "public"."leads_status_enum"`);
        await queryRunner.query(`DROP TABLE "lead_sources"`);
        await queryRunner.query(`DROP TABLE "student_parents"`);
        await queryRunner.query(`DROP TABLE "parents"`);
        await queryRunner.query(`DROP TABLE "quiz_results"`);
        await queryRunner.query(`DROP TABLE "quiz_options"`);
        await queryRunner.query(`DROP TABLE "quiz_questions"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "audit_logs"`);
        await queryRunner.query(`DROP TYPE "public"."audit_logs_action_enum"`);
        await queryRunner.query(`DROP TABLE "sms_logs"`);
        await queryRunner.query(`DROP TYPE "public"."sms_logs_status_enum"`);
        await queryRunner.query(`DROP TABLE "holidays"`);
        await queryRunner.query(`DROP TABLE "app_settings"`);
        await queryRunner.query(`DROP TYPE "public"."app_settings_type_enum"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
        await queryRunner.query(`DROP TABLE "teacher_attendance"`);
        await queryRunner.query(`DROP TYPE "public"."teacher_attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "teacher_salaries"`);
    }

}
