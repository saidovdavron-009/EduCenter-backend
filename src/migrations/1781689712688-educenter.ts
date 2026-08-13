import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1781689712688 implements MigrationInterface {
    name = 'Educenter1781689712688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" RENAME COLUMN "isActive" TO "is_active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" RENAME COLUMN "is_active" TO "isActive"`);
    }

}
