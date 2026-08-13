import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1783186533751 implements MigrationInterface {
    name = 'Educenter1783186533751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "login_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_e564194a9a22f8c623354284f75" UNIQUE ("login_id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_e564194a9a22f8c623354284f75"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "login_id"`);
    }

}
