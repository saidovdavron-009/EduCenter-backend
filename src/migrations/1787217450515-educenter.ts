import { MigrationInterface, QueryRunner } from "typeorm";

export class Educenter1787217450515 implements MigrationInterface {
    name = 'Educenter1787217450515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "monthly_price_for_teacher" numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "monthly_price_for_teacher"`);
    }

}
