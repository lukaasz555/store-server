import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

export type DescriptionType = Record<
  string,
  string | number | string[] | Record<string, string | number | string[]>
>;

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: false, type: 'json' })
  description: DescriptionType;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  // TODO: Add when Log entity is ready
  // @Column()
  // logs: Log[];

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  purchasePriceInPLN: number;

  @Column({ default: 0 })
  taxRate: number;

  @Column({ default: null })
  discountValueInPercent: number | null;

  @Column({ default: null })
  discountValuePLN: number | null;

  @DeleteDateColumn()
  deletedAt?: Date;
}
