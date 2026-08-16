import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1786716700000 implements MigrationInterface {
    name = 'Educenter1786716700000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" ADD "monthly_fee" numeric(12,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "monthly_fee"`);
    }

}
