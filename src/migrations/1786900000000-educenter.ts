import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1786900000000 implements MigrationInterface {
    name = 'Educenter1786900000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" ADD "days" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "days"`);
    }

}
