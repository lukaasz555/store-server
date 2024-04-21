import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSchema1713693531614 implements MigrationInterface {
  name = 'UserSchema1713693531614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`pricesHistory\` \`pricesHistory\` json NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`pricesHistory\` \`pricesHistory\` json NOT NULL`,
    );
  }
}
