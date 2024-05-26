import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsSoftDelete1716732797092 implements MigrationInterface {
  name = 'ProductsSoftDelete1716732797092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`deletedAt\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`deletedAt\``,
    );
  }
}
