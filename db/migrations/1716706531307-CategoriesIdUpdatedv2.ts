import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriesIdUpdatedv21716706531307 implements MigrationInterface {
  name = 'CategoriesIdUpdatedv21716706531307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_ccde635bce518afe7c110858cc4\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_ccde635bce518afe7c110858cc4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` bigint NULL`,
    );
  }
}
