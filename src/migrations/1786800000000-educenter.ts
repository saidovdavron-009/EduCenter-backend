import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1786800000000 implements MigrationInterface {
    name = 'Educenter1786800000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Old rows stored the teachers.id (not users.id) in teacher_id. Remap
        // to the owning user's id before renaming, since the salary feature
        // now covers any staff member (teachers + admins) keyed by users.id.
        await queryRunner.query(`UPDATE "teacher_salaries" ts SET "teacher_id" = t."user_id" FROM "teachers" t WHERE t."id" = ts."teacher_id"`);
        await queryRunner.query(`ALTER TABLE "teacher_salaries" RENAME TO "staff_salaries"`);
        await queryRunner.query(`ALTER TABLE "staff_salaries" RENAME COLUMN "teacher_id" TO "employee_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_salaries" RENAME COLUMN "employee_id" TO "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "staff_salaries" RENAME TO "teacher_salaries"`);
        await queryRunner.query(`UPDATE "teacher_salaries" ts SET "teacher_id" = t."id" FROM "teachers" t WHERE t."user_id" = ts."teacher_id"`);
    }

}
