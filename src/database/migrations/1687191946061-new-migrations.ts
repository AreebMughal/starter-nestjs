import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1687191946061 implements MigrationInterface {
    name = 'NewMigrations1687191946061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tbl_user_role_enum" AS ENUM('SUPER_ADMIN', 'ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "tbl_user" ("created_by" integer NOT NULL, "updated_by" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "user_name" text, "role" "public"."tbl_user_role_enum" NOT NULL DEFAULT 'ADMIN', "email" text NOT NULL, "phone" text, "is_email_verified" boolean NOT NULL DEFAULT false, "password" text NOT NULL, CONSTRAINT "UQ_0a59bafa265a3130ee6ed8431e9" UNIQUE ("user_name"), CONSTRAINT "UQ_da03ffed3d54f7872792df358f2" UNIQUE ("email"), CONSTRAINT "UQ_862aae9dfe1a6534b7fa8b6a3e9" UNIQUE ("phone"), CONSTRAINT "PK_1262f713cac678ecfe15460073b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tbl_user"`);
        await queryRunner.query(`DROP TYPE "public"."tbl_user_role_enum"`);
    }

}
