import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriesRemovedChildrenCategories1716732117771
  implements MigrationInterface
{
  name = 'CategoriesRemovedChildrenCategories1716732117771';

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
