import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: string;

  @Column()
  location: string;

  @Column({ nullable: true, default: '' })
  result: string;

  @ManyToOne((type) => User, (user) => user.createdMatches)
  creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  players: User[];
}
