import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriesSoftDelete1716732694955 implements MigrationInterface {
  name = 'CategoriesSoftDelete1716732694955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD \`deletedAt\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP COLUMN \`deletedAt\``,
    );
  }
}
