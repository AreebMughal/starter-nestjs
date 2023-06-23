import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrations1687426826151 implements MigrationInterface {
  name = 'NewMigrations1687426826151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."tbl_profile_gender_enum" AS ENUM('MALE', 'FEMALE', 'NOT_SPECIFIED', 'NULL')`
    );
    await queryRunner.query(
      `CREATE TABLE "tbl_profile" ("created_by" integer NOT NULL, "updated_by" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "phone_number" text NOT NULL, "gender" "public"."tbl_profile_gender_enum" NOT NULL, "dob" text NOT NULL, "address" text NOT NULL, "user_id" integer, CONSTRAINT "REL_e6a0aa95306ed9c57974fe8b11" UNIQUE ("user_id"), CONSTRAINT "PK_fc7d40227f95c2d459306f15ff5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_user" DROP CONSTRAINT "UQ_0a59bafa265a3130ee6ed8431e9"`
    );
    await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "user_name"`);
    await queryRunner.query(
      `ALTER TABLE "tbl_user" DROP CONSTRAINT "UQ_862aae9dfe1a6534b7fa8b6a3e9"`
    );
    await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TYPE "public"."tbl_user_role_enum" RENAME TO "tbl_user_role_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tbl_user_role_enum" AS ENUM('SUPER_ADMIN', 'CUSTOMER', 'SERVICE_PROVIDER')`
    );
    await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "tbl_user" ALTER COLUMN "role" TYPE "public"."tbl_user_role_enum" USING "role"::"text"::"public"."tbl_user_role_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."tbl_user_role_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "tbl_profile" ADD CONSTRAINT "FK_e6a0aa95306ed9c57974fe8b11b" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_profile" DROP CONSTRAINT "FK_e6a0aa95306ed9c57974fe8b11b"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tbl_user_role_enum_old" AS ENUM('SUPER_ADMIN', 'ADMIN', 'USER')`
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_user" ALTER COLUMN "role" TYPE "public"."tbl_user_role_enum_old" USING "role"::"text"::"public"."tbl_user_role_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" SET DEFAULT 'ADMIN'`);
    await queryRunner.query(`DROP TYPE "public"."tbl_user_role_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."tbl_user_role_enum_old" RENAME TO "tbl_user_role_enum"`
    );
    await queryRunner.query(`ALTER TABLE "tbl_user" ADD "phone" text`);
    await queryRunner.query(
      `ALTER TABLE "tbl_user" ADD CONSTRAINT "UQ_862aae9dfe1a6534b7fa8b6a3e9" UNIQUE ("phone")`
    );
    await queryRunner.query(`ALTER TABLE "tbl_user" ADD "user_name" text`);
    await queryRunner.query(
      `ALTER TABLE "tbl_user" ADD CONSTRAINT "UQ_0a59bafa265a3130ee6ed8431e9" UNIQUE ("user_name")`
    );
    await queryRunner.query(`DROP TABLE "tbl_profile"`);
    await queryRunner.query(`DROP TYPE "public"."tbl_profile_gender_enum"`);
  }
}
