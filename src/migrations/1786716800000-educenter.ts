import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1786716800000 implements MigrationInterface {
    name = 'Educenter1786716800000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_super_admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_super_admin"`);
    }

}
