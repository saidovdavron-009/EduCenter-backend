import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1787218479117 implements MigrationInterface {
    name = 'Educenter1787218479117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."teacher_attendance_status_enum" RENAME TO "teacher_attendance_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."teacher_attendance_status_enum" AS ENUM('ON_TIME', 'LATE', 'ABSENT', 'EXCUSED')`);
        await queryRunner.query(`ALTER TABLE "teacher_attendance" ALTER COLUMN "status" TYPE "public"."teacher_attendance_status_enum" USING "status"::"text"::"public"."teacher_attendance_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."teacher_attendance_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."staff_attendance_status_enum" RENAME TO "staff_attendance_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."staff_attendance_status_enum" AS ENUM('ON_TIME', 'LATE', 'ABSENT', 'EXCUSED')`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" ALTER COLUMN "status" TYPE "public"."staff_attendance_status_enum" USING "status"::"text"::"public"."staff_attendance_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."staff_attendance_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."staff_attendance_status_enum_old" AS ENUM('ON_TIME', 'LATE', 'ABSENT')`);
        await queryRunner.query(`ALTER TABLE "staff_attendance" ALTER COLUMN "status" TYPE "public"."staff_attendance_status_enum_old" USING "status"::"text"::"public"."staff_attendance_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."staff_attendance_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."staff_attendance_status_enum_old" RENAME TO "staff_attendance_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."teacher_attendance_status_enum_old" AS ENUM('ON_TIME', 'LATE', 'ABSENT')`);
        await queryRunner.query(`ALTER TABLE "teacher_attendance" ALTER COLUMN "status" TYPE "public"."teacher_attendance_status_enum_old" USING "status"::"text"::"public"."teacher_attendance_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."teacher_attendance_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."teacher_attendance_status_enum_old" RENAME TO "teacher_attendance_status_enum"`);
    }

}
