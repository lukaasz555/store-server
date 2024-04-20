import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrations1713548224303 implements MigrationInterface {
  name = 'NewMigrations1713548224303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`discountCode\` json NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`discountCode\``,
    );
  }
}
