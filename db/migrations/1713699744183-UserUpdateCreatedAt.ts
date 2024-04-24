import { DateTime } from 'luxon';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserUpdateCreatedAt1713699744183 implements MigrationInterface {
  name = 'UserUpdateCreatedAt1713699744183';
  currentUTCDateTimeString = DateTime.utc().toISO();

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`createdAt\` varchar(255) NOT NULL DEFAULT '${this.currentUTCDateTimeString}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
  }
}
