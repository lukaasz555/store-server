import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSchemaFavoriteProductsIdsV21713694088224
  implements MigrationInterface
{
  name = 'UserSchemaFavoriteProductsIdsV21713694088224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`pricesHistory\` \`pricesHistory\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`favoriteProductsIds\` \`favoriteProductsIds\` json NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`favoriteProductsIds\` \`favoriteProductsIds\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`pricesHistory\` \`pricesHistory\` json NOT NULL`,
    );
  }
}
