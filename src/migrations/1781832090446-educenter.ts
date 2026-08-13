import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1781832090446 implements MigrationInterface {
    name = 'Educenter1781832090446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parents" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "parents" ADD CONSTRAINT "UQ_07b4151ae2a983823d922d5cf03" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parents" DROP CONSTRAINT "UQ_07b4151ae2a983823d922d5cf03"`);
        await queryRunner.query(`ALTER TABLE "parents" DROP COLUMN "email"`);
    }

}
