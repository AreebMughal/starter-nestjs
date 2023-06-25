import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1687720794617 implements MigrationInterface {
    name = 'NewMigrations1687720794617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_profile" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "tbl_profile" ADD "dob" TIMESTAMP NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_profile" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "tbl_profile" ADD "dob" text NOT NULL DEFAULT ''`);
    }

}
