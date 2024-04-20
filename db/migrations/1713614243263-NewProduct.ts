import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewProduct1713614243263 implements MigrationInterface {
  name = 'NewProduct1713614243263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`stock\` int NOT NULL DEFAULT '0', \`description\` json NOT NULL, \`pricePLN\` json NOT NULL, \`priceEUR\` json NULL, \`pricesHistory\` json NOT NULL, \`purchasePrice\` json NOT NULL, \`taxRate\` int NOT NULL DEFAULT '0', \`discountValueInPercent\` int NULL, \`discountValuePLN\` int NULL, \`discountValueEUR\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders_products_products\` (\`ordersId\` bigint NOT NULL, \`productsId\` bigint NOT NULL, INDEX \`IDX_dbab812991c32a735a34748370\` (\`ordersId\`), INDEX \`IDX_af9cb00de5ab2af01a6a325343\` (\`productsId\`), PRIMARY KEY (\`ordersId\`, \`productsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders_products_products\` ADD CONSTRAINT \`FK_dbab812991c32a735a34748370c\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders_products_products\` ADD CONSTRAINT \`FK_af9cb00de5ab2af01a6a3253435\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders_products_products\` DROP FOREIGN KEY \`FK_af9cb00de5ab2af01a6a3253435\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders_products_products\` DROP FOREIGN KEY \`FK_dbab812991c32a735a34748370c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_af9cb00de5ab2af01a6a325343\` ON \`orders_products_products\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_dbab812991c32a735a34748370\` ON \`orders_products_products\``,
    );
    await queryRunner.query(`DROP TABLE \`orders_products_products\``);
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
