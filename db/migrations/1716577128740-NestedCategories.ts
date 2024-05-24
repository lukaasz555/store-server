import { MigrationInterface, QueryRunner } from 'typeorm';

export class NestedCategories1716577128740 implements MigrationInterface {
  name = 'NestedCategories1716577128740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD \`parentCategoryId\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_ccde635bce518afe7c110858cc4\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_ccde635bce518afe7c110858cc4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP COLUMN \`parentCategoryId\``,
    );
  }
}
