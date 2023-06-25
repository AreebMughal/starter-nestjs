import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1687702575026 implements MigrationInterface {
    name = 'NewMigrations1687702575026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_otp" ("created_by" integer, "updated_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" text NOT NULL, "otp" integer NOT NULL, "expiry_time" date NOT NULL, CONSTRAINT "UQ_d69692e78478551de7df90f9a88" UNIQUE ("email"), CONSTRAINT "PK_3ab059a41a8b478b78f61bd49a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_profile" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_profile" ALTER COLUMN "updated_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "updated_by" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_profile" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_profile" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "tbl_otp"`);
    }

}
