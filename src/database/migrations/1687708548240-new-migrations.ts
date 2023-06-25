import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1687708548240 implements MigrationInterface {
    name = 'NewMigrations1687708548240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_otp" DROP COLUMN "expiry_time"`);
        await queryRunner.query(`ALTER TABLE "tbl_otp" ADD "expiry_time" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_otp" DROP COLUMN "expiry_time"`);
        await queryRunner.query(`ALTER TABLE "tbl_otp" ADD "expiry_time" date NOT NULL`);
    }

}
