import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1687516020496 implements MigrationInterface {
    name = 'NewMigrations1687516020496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "password" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "password" DROP DEFAULT`);
    }

}
