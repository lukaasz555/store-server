import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(() => Category, (category) => category.childrenCategories, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentCategoryId' })
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  childrenCategories: Category[];
}
