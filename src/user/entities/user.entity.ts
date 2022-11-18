import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birth: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @Column({ name: 'img_url' })
  imgUrl: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todo: Todo;
}
