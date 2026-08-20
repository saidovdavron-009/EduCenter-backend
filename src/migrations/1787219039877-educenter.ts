import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1787219039877 implements MigrationInterface {
    name = 'Educenter1787219039877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_attendance" ADD "planned_start_time" TIME`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" ADD "planned_end_time" TIME`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "lesson_sessions" ADD "marked_by_admin_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_sessions" DROP COLUMN "marked_by_admin_id"`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" DROP COLUMN "planned_end_time"`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" DROP COLUMN "planned_start_time"`);
    }

}
