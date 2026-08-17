import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1786970875966 implements MigrationInterface {
    name = 'Educenter1786970875966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" ADD "duration_months" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "days" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "days" character varying`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "duration_months"`);
    }

}
