import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('favorites')
export class Favorites {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favorites, { nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;

  @Column()
  pokemonName: string;

}
