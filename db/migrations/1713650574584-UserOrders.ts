import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserOrders1713650574584 implements MigrationInterface {
  name = 'UserOrders1713650574584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`userId\` bigint NOT NULL, \`productsCost\` int NOT NULL DEFAULT '0', \`shippingCost\` int NOT NULL DEFAULT '0', \`deliveryType\` varchar(255) NOT NULL DEFAULT 'inpost', \`paymentMethod\` varchar(255) NOT NULL DEFAULT 'blik', \`status\` varchar(255) NOT NULL DEFAULT 'new', \`invoiceData\` json NULL, \`deliveryAddress\` json NULL, \`discountCode\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders_products_products\` (\`ordersId\` bigint NOT NULL, \`productsId\` bigint NOT NULL, INDEX \`IDX_dbab812991c32a735a34748370\` (\`ordersId\`), INDEX \`IDX_af9cb00de5ab2af01a6a325343\` (\`productsId\`), PRIMARY KEY (\`ordersId\`, \`productsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`pricesHistory\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`purchasePrice\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`taxRate\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`discountValueInPercent\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`discountValuePLN\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`discountValueEUR\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`discountValueEUR\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`discountValuePLN\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`discountValueInPercent\``,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`taxRate\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`purchasePrice\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`pricesHistory\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_af9cb00de5ab2af01a6a325343\` ON \`orders_products_products\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_dbab812991c32a735a34748370\` ON \`orders_products_products\``,
    );
    await queryRunner.query(`DROP TABLE \`orders_products_products\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
  }
}
