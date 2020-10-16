import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
import { DishEntity } from './dishes.entity';
@Entity({ name: 'ingredients' })
export class IngredientEntity {
	@PrimaryGeneratedColumn() ingredient_id: number;
	@Column({ type: 'varchar', length: 50 })
	ingredient_name: string;
	@Column({ type: 'varchar', length: 50 })
	ingredient_type: string;
	@Column({ type: 'varchar', length: 50 })
	ingredient_quantity: string;
	@Column() dish_id: number;
	@Column({ type: 'boolean', default: false })
	is_deleted: boolean;

	@ManyToOne(() => DishEntity, (dish: DishEntity) => dish.ingredient)
	@JoinColumn({ name: 'dish_id' })
	dish: DishEntity;
}
