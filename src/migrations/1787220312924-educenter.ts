import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1787220312924 implements MigrationInterface {
    name = 'Educenter1787220312924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "staff_salary_corrections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "staff_salary_id" uuid NOT NULL, "amount" numeric(12,2) NOT NULL, "reason" character varying NOT NULL, "created_by" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9191f02d1883f90fa8858ad8f2e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "staff_salary_corrections"`);
    }

}
