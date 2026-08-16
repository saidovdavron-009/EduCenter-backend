import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1786716587690 implements MigrationInterface {
    name = 'Educenter1786716587690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "branch_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "branch_id"`);
    }

}
