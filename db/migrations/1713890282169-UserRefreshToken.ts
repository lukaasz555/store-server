import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefreshToken1713890282169 implements MigrationInterface {
  name = 'UserRefreshToken1713890282169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`refreshTokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`userId\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refreshTokens\` ADD CONSTRAINT \`FK_265bec4e500714d5269580a0219\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`refreshTokens\` DROP FOREIGN KEY \`FK_265bec4e500714d5269580a0219\``,
    );
    await queryRunner.query(`DROP TABLE \`refreshTokens\``);
  }
}
