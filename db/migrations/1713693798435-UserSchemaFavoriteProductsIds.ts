import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSchemaFavoriteProductsIds1713693798435
  implements MigrationInterface
{
  name = 'UserSchemaFavoriteProductsIds1713693798435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`favoriteProductsIds\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`pricesHistory\` \`pricesHistory\` json NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`pricesHistory\` \`pricesHistory\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`favoriteProductsIds\``,
    );
  }
}
