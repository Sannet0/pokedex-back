import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Favorites } from './favorites.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Favorites, favorites => favorites.user)
  favorites: Favorites[];
}
