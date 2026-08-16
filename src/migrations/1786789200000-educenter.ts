import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1786789200000 implements MigrationInterface {
    name = 'Educenter1786789200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" ADD "max_groups" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "max_groups"`);
    }

}
