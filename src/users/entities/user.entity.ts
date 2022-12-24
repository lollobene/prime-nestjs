import { Match } from '../../matches/entities/match.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Category } from '../enums/category.enum';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.base,
  })
  categories: Category[];

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.player],
  })
  roles: Role[];

  @OneToMany((type) => Match, (match) => match.creator)
  createdMatches: Match[];
}
